import { anioAttributes, anioCreationAttributes } from '../models/init-models';
import { Request, Response } from 'express';
import { anio } from '../models/anio';
import db from '../db/connection';
import { initModels } from '../models/init-models';

import {v4} from 'uuid';

initModels(db);

//crear anio
export const crearAnio = async (req: Request, res: Response) => {
    try {

        //obtener el ultimo anio
        const anioActual = await anio.findOne({
            order: [
                ['id_anio', 'DESC']
            ]
        });
        //obtener el anio actual
        const anioActualNumber = anioActual?.anio;
        //sumarle 1 al anio actual
        const anioNuevo = anioActualNumber! + 1;
        //crear el anio
        const anioNuevoCreado: anioCreationAttributes = {
            id_anio: v4(),
            anio: anioNuevo
        }
        await anio.create(anioNuevoCreado);
        res.json({
            msg: 'anio creado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }
}

//obtener anios
export const obtenerAnios = async (req: Request, res: Response) => {
    try {

        const anios = await anio.findAll();
        res.json({
            anios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}

