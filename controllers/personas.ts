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
//crear metodo para retornar todas las personas
export const getPersonas = async (req: Request, res: Response) => {
    const listPersonas = await personas.findAll();
    if (listPersonas) {
        res.json({ listPersonas });
    } else {
        res.status(404).json({
            msg: 'No hay personas'
        })
    }
}
//crear metodo para eliminar una persona
export const eliminarPersona = async (req: Request, res: Response) => {
    const { id } = req.params;
    const encontrarPersona = await personas.findByPk(id);
    if (!encontrarPersona) {
        return res.status(404).json({
            msg: 'Persona no encontrada'
        })
    }
    await encontrarPersona.destroy();
    res.json({
        msg: 'Persona eliminada'
    })
}
//crear metodo para actualizar el nombre de una persona
// export const actualizarPersona = async (req: Request, res: Response) => {
//     const {nombre } = req.body;
//     const encontrarPersona = await personas.findOne({
//         where: {
//             NOMBRE: req.body.nombre
//         }
//     })
//     if (encontrarPersona) {
//         return res.status(400).json({
//             msg: 'El nombre ya existe'
//         })
//     }else{
//         const upPersona: personasCreationAttributes = {
//             NOMBRE: nombre,
//         }
//         if (!encontrarPersona) {
//             return res.status(404).json({
//                 msg: 'Persona no encontrada'
//             })
//         }
//         await encontrarPersona.update(upPersona);
//         res.json({
//             msg: 'Persona actualizada'
//         })
//     }
// }


