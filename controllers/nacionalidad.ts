import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, nacionalidadCreationAttributes,nacionalidadAttributes } from "../models/init-models";
import { nacionalidad } from '../models/nacionalidad';

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
            msg: 'Nacionalidad creada '
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
//metodo para retorrnar los nombres de las nacionalidades
export const getNombresNacionalidades = async (req: Request, res: Response) => {
    const listNacionalidades = await nacionalidad.findAll({
        attributes: ['NACIONALIDAD']
    });
    if (listNacionalidades) {
        res.json({listNacionalidades});
    } else {
        res.status(404).json({
            msg: 'No hay nacionalidades'
        })
    }
    
}

//crear metodo para retornar una nacionalidad por nombre
export const getNacionalidad = async (req: Request, res: Response) => {
    const { nombre } = req.params;
    const encontrarNacionalidad = await nacionalidad.findOne({
        where: {
            NACIONALIDAD: nombre
        }
    })
    if (encontrarNacionalidad) {
        res.json({ encontrarNacionalidad });
    }
    else {
        res.status(404).json({
            msg: 'Nacionalidad no encontrada'
        })
    }
}
//crear metodo para actualizar una nacionalidad
export const actualizarNacionalidad = async (req: Request, res: Response) => {
    const { id } = req.body;
    const { nomNacionalidad } = req.body;
    const nacionalidadAct = await nacionalidad.findByPk(id);
    if (!nacionalidadAct) {
        return res.status(404).json({
            msg: 'Nacionalidad no encontrada '
        })
    }else{
        await nacionalidadAct.update({
            NACIONALIDAD: nomNacionalidad
        })
        res.json({
            msg: 'Nacionalidad actualizada'
        })
    }
}