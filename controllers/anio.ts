import { anioAttributes, anioCreationAttributes } from '../models/init-models';
import { Request, Response } from 'express';
import { Anio } from '../models/anio';
import db from '../db/connection';
import { initModels } from '../models/init-models';

initModels(db);

//crear anio
export const crearAnio = async (req: Request, res: Response) => {
    try {

        //obtener el ultimo anio
        const anioActual = await Anio.findOne({
            order: [
                ['ID_ANIO', 'DESC']
            ]
        });
        //obtener el anio actual
        const anioActualNumber = anioActual?.ANIO;
        //sumarle 1 al anio actual
        const anioNuevo = anioActualNumber! + 1;
        //crear el anio
        const anioNuevoCreado: anioCreationAttributes = {
            ANIO: anioNuevo
        }
        await Anio.create(anioNuevoCreado);
        res.json({
            msg: 'Anio creado'
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

        const anios = await Anio.findAll();
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

