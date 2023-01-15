import db from '../db/connection';
import { Request, Response } from "express";
import { initModels,barrios, barriosCreationAttributes } from "../models/init-models";

initModels(db);

export const crearBarrio = async (req: Request, res: Response) => {
    if (!req.body.barrio) {
        return res.status(400).json({
            msg: 'No hay barrio'
        })
    }

    const encontrarBarrio = await barrios.findOne({
        where: {
            NOM_BARRIO: req.body.barrio
        }
    })
    if (encontrarBarrio) {
        return res.status(400).json({
            msg: 'El barrio ya existe'
        })
    } else {
        const barrio: barriosCreationAttributes = {
            NOM_BARRIO: req.body.barrio,
        }
        await barrios.create(barrio);
        res.json({
            msg: 'Barrio creado'
        })


    }




}
//obtener barrios
export const obtenerBarrios = async (req: Request, res: Response) => {
    const listbarrios = await barrios.findAll({});
    res.json({
        listbarrios
    })
}

//eliminar barrio
export const eliminarBarrio = async (req: Request, res: Response) => {
    const { id } = req.params;
    const barrio = await barrios.findByPk(id);
    if (!barrio) {
        return res.status(404).json({
            msg: 'No existe el barrio'
        })
    } else {
        await barrio.destroy();
        res.json({
            msg: 'Barrio eliminado'
        })
    }
}

