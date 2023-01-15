import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, nacionalidad, nacionalidadCreationAttributes } from "../models/init-models";

initModels(db);


export const crearNacionalidad = async (req: Request, res: Response) => {
    // const {nacionalidad}=req.body;
    const encontrarNacionalidad = await nacionalidad.findOne({
        where: {
            NACIONALIDAD: req.body.nacionalidad
        }
    })
    if (encontrarNacionalidad) {
        return res.status(400).json({
            msg: 'La nacionalidad ya existe'
        })
    } else {
        const nacionalidadcr: nacionalidadCreationAttributes = {
            NACIONALIDAD: req.body.nacionalidad,
        }
        await nacionalidad.create(nacionalidadcr);
        res.json({
            msg: 'Nacionalidad creada'
        })

    }

}

//crear metodo para retornar todas las nacionalidades
export const getNacionalidades = async (req: Request, res: Response) => {
    const listNacionalidades = await nacionalidad.findAll();
    if (listNacionalidades) {
        res.json({listNacionalidades});
    } else {
        res.status(404).json({
            msg: 'No hay nacionalidades'
        })
    }

}