import db from '../db/connection';
import { Request, Response } from "express";
import {
    initModels, comuneros, requisitos, requisito_apr, personas, facturas,
    cuotas_factura, cuota_anual, personasAttributes, personasCreationAttributes, barrios
} from "../models/init-models";



initModels(db);
export const crearPersona = async (req: Request, res: Response) => {
    try {

        //si existe una persona con la misma cedula
        const encontrarPersona = await personas.findOne({
            where: {
                CEDULA: req.body.cedula
            }
        })
        if (encontrarPersona) {
            return res.status(400).json({
                msg: 'La persona ya existe'
            })
        } else {
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
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
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
                msg: 'No hay personas'

            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
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
                msg: 'Persona no encontrada'
            })
        }
        await encontrarPersona.destroy();
        res.json({
            msg: 'Persona eliminada'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
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
                msg: 'Persona no encontrada'
            })
        }
        //actualizar el nombre de la persona
        await encontrarPersona.update({
            NOMBRE: req.body.nombre,
            APELLIDOS: req.body.apellidos,
            FECHA_DE_NACIMIENTO: req.body.fecha_nacimiento,
            CELULAR_PER: req.body.celular,
        })
        res.json({
            msg: 'Persona actualizada'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
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
                msg: 'Persona no encontrada'
            })
        }
        if (encontrarPersona) {
            const estado = encontrarPersona.ESTADO;
            if (estado == 1) {
                encontrarPersona.ESTADO = 0;
            } else {
                encontrarPersona.ESTADO = 1;
            }
            await encontrarPersona.save();
            res.json({
                msg: 'Estado actualizado'
            })


        } else {
            res.status(404).json({
                msg: 'No se pudo actualizar el estado'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
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
                        as: 'ID_REQ_requisito'
                    }
                ]
            }
        ]
    });
    if (listPersonas) {
        res.json({ listPersonas });
    } else {
        res.status(404).json({
            msg: 'No hay personas'

        })
    }
}


//buscar comuneros por cedula
export const buscarComunerosPorCedula = async (req: Request, res: Response) => {
    const { cedula } = req.body;
    console.log(cedula);

    const listComuneros = await personas.findOne({
        where: {
            CEDULA: cedula,
        },
        attributes: ['APELLIDOS', 'NOMBRE', 'CELULAR_PER', 'ESTADO'],

        include: [
            {
                model: comuneros,
                as: 'comuneros',
                attributes: ['ID_COMUNERO'],
                include: [
                    {
                        model: barrios,
                        as: 'ID_BARRIO_barrio',
                        attributes: ['NOM_BARRIO']
                    },
                ]
            },

        ]
    });
    if (listComuneros) {
        res.json({ listComuneros });
    } else {
        res.status(404).json({
            msg: 'El numero de cedula no existe'
        })
    }
}