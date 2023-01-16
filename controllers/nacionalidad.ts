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

//crear metodo para eliminar una nacionalidad
export const eliminarNacionalidad = async (req: Request, res: Response) => {
    const { id } = req.params;
    const encontrarNacionalidad = await nacionalidad.findByPk(id);
    if (!encontrarNacionalidad) {
        return res.status(404).json({
            msg: 'Nacionalidad no encontrada'
        })
    }
    await encontrarNacionalidad.destroy();
    res.json({
        msg: 'Nacionalidad eliminada'
    })
}
//crear metodo para actualizar una nacionalidad
export const actualizarNacionalidad = async (req: Request, res: Response) => {
    const { id } = req.params;
    const encontrarNacionalidad = await nacionalidad.findByPk(id);
    if (!encontrarNacionalidad) {
        return res.status(404).json({
            msg: 'Nacionalidad no encontrada'
        })
    }
    const nacionalidadUp: nacionalidadCreationAttributes = {
        NACIONALIDAD: req.body.nacionalidad,
    }
    await encontrarNacionalidad.update(nacionalidadUp);
    res.json({
        msg: 'Nacionalidad actualizada'
    })
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
