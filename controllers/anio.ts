import{anioAttributes,anioCreationAttributes} from '../models/init-models';
import {Request,Response} from 'express';
import{anio} from '../models/anio';
import db from '../db/connection';
import { initModels } from '../models/init-models';

initModels(db);

//crear anio
export const crearAnio = async (req:Request,res:Response)=>{
    const anioCr:anioCreationAttributes = {
        ANIO:req.body.anio,
    }
    await anio.create(anioCr);
    res.json({
        msg:'Año creado'
    })

}

