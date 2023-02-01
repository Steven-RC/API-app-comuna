import { initModels,requisito_apr,requisito_aprAttributes,requisito_aprCreationAttributes } from "../models/init-models";
import { Request, Response } from "express";
import { personas } from "../models/personas";
import { requisitos } from "../models/requisitos";
import db from "../db/connection";

initModels(db);

//aprobar requisito
export const aprobarRequisito = async (req:Request,res:Response)=>{
    const fechaApr = new Date().toString();   
    const {id_requisito,id_persona,observacion} = req.body;
    //buscar persona    
    const reqApr:requisito_aprCreationAttributes = {
        ID_REQ:id_requisito,
        ID_PERSONA:id_persona,
        OBSERVACION:observacion,
        FECHA_AP:fechaApr
    }
    await requisito_apr.create(reqApr);
    res.json({
        msg:'Requisito aprobado con exito'
    })
}

//obtener todos los requisitos  y observaciones
export const obtenerRequisitosApr = async (req:Request,res:Response)=>{
    const listRequisitosApr = await requisito_apr.findAll({
        attributes:['ID_REQ','ID_PERSONA']
    });
    res.json({
        listRequisitosApr
    })
}

//obtener personas con requisitos aprobados
export const obtenerPersonasApr = async (req:Request,res:Response)=>{
    const reqApr = await requisito_apr.findAll({
        attributes:['ID_PERSONA'],
        include:{
            model:requisitos,
            as:'ID_REQ_requisito',
            attributes:['ID_REQ','REQUISITO',],


        },
        
    });
    res.json({
        reqApr
    })
}