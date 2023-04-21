import db from '../db/connection';
import { Request, Response } from "express";
import {
    initModels, comuneros, requisitos, requisito_apr, personas, personasCreationAttributes, barrios
} from "../models/init-models";

import {v4} from 'uuid';
 
initModels(db);
export const crearPersona = async (req: Request, res: Response) => {
    try {

        //si existe una persona con la misma cedula
        const encontrarPersona = await personas.findOne({
            where: {
                cedula: req.body.cedula 
            }
        })
        if (encontrarPersona) {
            return res.status(400).json({
                msg: 'la persona ya existe'
            })
        } else {
            const persona: personasCreationAttributes = {
                id_persona: 'per-'+v4(),
                cedula: req.body.cedula,
                apellidos: req.body.apellidos,
                nombre: req.body.nombre,
                fecha_de_nacimiento: req.body.fecha_nacimiento,
                genero: req.body.genero,
                celular_per: req.body.celular,
                id_nacionalidad: req.body.nacionalidad,
            }
            await personas.create(persona);
            res.json({
                msg: 'persona creada'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })

    }
}
//crear metodo para retornar todas las personas
export const obtenerPersonas = async (req: Request, res: Response) => {
    try {
        const listPersonas = await personas.findAll();
        if (listPersonas) {
            res.json({ listPersonas });
        } else {
            res.status(404).json({
                msg: 'no hay personas'

            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })

    }
}
//crear metodo para eliminar una persona
export const eliminarPersona = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const encontrarPersona = await personas.findByPk(id);
        if (!encontrarPersona) {
            return res.status(404).json({
                msg: 'persona no encontrada'
            })
        }
        await encontrarPersona.destroy();
        res.json({
            msg: 'persona eliminada'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })

    }
}
//crear metodo para actualizar el nombre de una persona
export const actualizarPersona = async (req: Request, res: Response) => {
    try {
        //obtener id del body de la persona
        const { id } = req.body;
        //buscar la persona por el id
        const encontrarPersona = await personas.findByPk(id);
        //si no existe la persona
        if (!encontrarPersona) {
            return res.status(404).json({
                msg: 'persona no encontrada'
            })
        }
        //actualizar el nombre de la persona
        await encontrarPersona.update({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            fecha_de_nacimiento: req.body.fecha_nacimiento,
            celular_per: req.body.celular,
        })
        res.json({
            msg: 'persona actualizada'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })


    }

}
//cambiar el estado de una persona
export const cambiarEstadoPersona = async (req: Request, res: Response) => {
    try {
        //obtener id del body de la persona
        const { id } = req.body;
        //buscar la persona por el id
        const encontrarPersona = await personas.findByPk(id);
        //si no existe la persona
        if (!encontrarPersona) {
            return res.status(404).json({
                msg: 'persona no encontrada'
            })
        }
        if (encontrarPersona) {
            const estado = encontrarPersona.estado;
            if (estado == 1) {
                encontrarPersona.estado = 0;
            } else {
                encontrarPersona.estado = 1;
            }
            await encontrarPersona.save();
            res.json({
                msg: 'estado actualizado'
            })


        } else {
            res.status(404).json({
                msg: 'no se pudo actualizar el estado'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })



    }
}

//obtener personas con todos los requisitos aprobados
export const obtenerPersonasRequisitosAprobados = async (req: Request, res: Response) => {
    const listPersonas = await personas.findAll({
        include: [
            {
                model: requisito_apr,
                as: 'requisito_aprs',
                include: [
                    {
                        model: requisitos,
                        as: 'id_req_requisito'
                    }
                ]
            }
        ]
    });
    if (listPersonas) {
        res.json({ listPersonas });
    } else {
        res.status(404).json({
            msg: 'no hay personas'

        })
    }
}


//buscar comuneros por cedula
export const buscarComunerosPorCedula = async (req: Request, res: Response) => {
    const { cedula } = req.body;
    console.log(cedula);

    const comunero = await personas.findOne({
        where: {
            cedula: cedula,
        },
        attributes: ['apellidos', 'nombre', 'celular_per', 'estado'],

        include: [
            {
                model: comuneros,
                as: 'comuneros',
                attributes: ['id_comunero','id_terreno'],
                include: [
                    {
                        model: barrios,
                        as: 'id_barrio_barrio',
                        attributes: ['nom_barrio']
                    },
                ]
            },

        ]
    });
    if (comunero) {
        res.json({ comunero });
    } else {
        res.status(404).json({
            msg: 'el numero de cedula no existe'
        })
    }
}