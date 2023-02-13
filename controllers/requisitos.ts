import {Request,Response }from 'express';
import db from '../db/connection';
import { initModels,requisitos,requisitosCreationAttributes,requisitosAttributes} from '../models/init-models';

initModels(db);


//registrar requisito
export const crearRequisito = async (req:Request,res:Response)=>{
    const {requisito,observacion} = req.body;
    const reqCr:requisitosCreationAttributes = {
        REQUISITO:requisito,
        OBSERVACION:observacion,
    }
    await requisitos.create(reqCr);
    res.json({
        msg:'Requisito creado'
    })
}

//obtener requisitos
export const obtenerRequisitos = async (req:Request,res:Response)=>{
    const listRequisitos = await requisitos.findAll({
        attributes:['ID_REQ','REQUISITO','OBSERVACION']
    });
    res.json({
        listRequisitos
    })
}

//actualizar requisito
export const actualizarRequisito = async (req:Request,res:Response)=>{
    const {id_requisito,requisito,observacion} = req.body;
    //actualizar requisito
    await requisitos.update({
        REQUISITO:requisito,
        OBSERVACION:observacion
    },{
        where:{
            ID_REQ:id_requisito
        }
    });
    res.json({
        msg:'Requisito actualizado'
    })


}

//cambiar estado requisito
export const cambiarEstadoRequisito = async (req:Request,res:Response)=>{
    const {id_requisito,estado} = req.body;
    await requisitos.update({
        REQ_ESTADO:estado
    },{
        where:{
            ID_REQ:id_requisito
        }
    });
    res.json({
        msg:'Estado actualizado'
    })
}
//obtener requisito por de una persona
export const obtenerRequisitoPersona = async (req:Request,res:Response)=>{

    const listRequisitos= await db.query("select personas.ID_PERSONA,personas.CEDULA, personas.APELLIDOS, personas.NOMBRE,requisitos.ID_REQ,requisitos.REQUISITO,requisitos.OBSERVACION,requisito_apr.FECHA_AP "+
    " from ((personas inner join requisito_apr on personas.ID_PERSONA = requisito_apr.ID_PERSONA) "+
    " inner join requisitos on requisito_apr.ID_REQ = requisitos.ID_REQ) where personas.ID_PERSONA = "+req.body.id_persona);
    //si no hay requisitos
    if (listRequisitos[0].length == 0){
        res.status(404).json({
            msg:'La persona no tiene requisitos aprobados' 
        })
    }else{
        res.json({
            listRequisitos
        })
    }

}

//obtener personas con requisitos todos los requisitos aprobados
