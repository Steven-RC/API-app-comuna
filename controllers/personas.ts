import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, personas, personasAttributes, personasCreationAttributes } from "../models/init-models";


initModels(db);
export const crearPersona = async (req: Request, res: Response) => {
    const persona: personasCreationAttributes = {
        CEDULA: req.body.cedula,
        APELLIDOS: req.body.apellidos,
        NOMBRE: req.body.nombre,
        FECHA_DE_NACIMIENTO: req.body.fecha_nacimiento,
        GENERO: req.body.genero,
        CELULAR_PER: req.body.celular,
        ID_NACIONALIDAD: req.body.nacionalidad,

    }
    await personas.create(persona);
    res.json({
        msg: 'Persona creada'
    })
}