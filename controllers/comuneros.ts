import db from '../db/connection';
import { Request, Response } from "express";
import { initModels,comuneros,comunerosAttributes, comunerosCreationAttributes, barrios} from "../models/init-models";
import { personas } from '../models/personas';

initModels(db);

export const getComuneros = async (req:Request,res:Response ) => {
    const listComuneros = await comuneros.findAll();
    if (listComuneros){
        res.json(listComuneros);
    }else{
        res.status(404).json({
            msg: 'No hay comuneros'
        })
    }

}
export const crearComunero = async (req:Request,res:Response ) => {
    const comuneroCr: comunerosCreationAttributes = {
        ID_BARRIO: req.body.barrio,
        CALIFICADO: req.body.calificado,
        ID_PERSONA: req.body.persona,
        CREATED_DATE: req.body.fecha,
        CREATED_TIME: req.body.hora,
    }
    await comuneros.create(comuneroCr);
    res.json({
        msg: 'Comunero creado'
    })

}
//obtener todos los comuneros con sus valores en la tabla persona y barrio
export const obtenerComuneros=async (req:Request,res:Response ) => {
    const listComuneros = await comuneros.findAll({
        attributes: ['ID_COMUNERO','ID_BARRIO','CALIFICADO','ID_PERSONA','CREATED_DATE','CREATED_TIME'],
        include: {
            model: personas,
            as: 'ID_PERSONA_persona',
            attributes: ['ID_PERSONA','NOM_PERSONA','APE_PERSONA','DNI_PERSONA','TELF_PERSONA','EMAIL_PERSON'],

    }
    ,
    
    });
    res.json(listComuneros);
}



