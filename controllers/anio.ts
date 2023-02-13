import{anioAttributes,anioCreationAttributes} from '../models/init-models';
import {Request,Response} from 'express';
import{anio} from '../models/anio';
import db from '../db/connection';
import { initModels } from '../models/init-models';

initModels(db);

//crear anio
export const crearAnio = async (req:Request,res:Response)=>{
    //obtener el ultimo anio
    const anioActual = await anio.findOne({
        order:[
            ['ID_ANIO','DESC']
        ]
    });
    //obtener el anio actual
    const anioActualNumber = anioActual?.ANIO;
    //sumarle 1 al anio actual
    const anioNuevo = anioActualNumber! + 1;
    //crear el anio
    const anioNuevoCreado:anioCreationAttributes = {
        ANIO:anioNuevo
    }
    await anio.create(anioNuevoCreado);
    res.json({
        msg:'Anio creado'
    })
}

//obtener anios
export const obtenerAnios = async (req:Request,res:Response)=>{
    const anios = await anio.findAll();
    res.json({
        anios
    })
}

