import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, comuneros, comunerosCreationAttributes, barrios } from "../models/init-models";
import { personas } from '../models/personas';
import { asociaciones } from '../models/asociaciones';
import {v4} from 'uuid';

initModels(db);


export const getComuneros = async (req: Request, res: Response) => {
    try {
        const listComuneros = await comuneros.findAll();
        if (listComuneros) {
            res.json(listComuneros);
        } else {
            res.status(404).json({
                msg: 'no hay comuneros'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })

    }

}
export const crearComunero = async (req: Request, res: Response) => {
    try {

        //si la persona esta en estado inactivo no se puede crear como comunero
        const encontrarPersona = await personas.findOne({
            where: {
                id_persona: req.body.persona,
                estado: 1
            }
        })
        if (!encontrarPersona) {
            return res.status(400).json({
                msg: 'la persona no existe o esta inactiva'
            })
        }
        //si la persona ya es comunero no se puede crear
        const encontrarComunero = await comuneros.findOne({
            where: {
                id_persona: encontrarPersona.id_persona,
                estado_com: 'activo'
            }
        })
        if (encontrarComunero) {
            return res.status(400).json({
                msg: 'la persona ya es comunero'
            })
        }
        const fecha = new Date().toString();
        const hora = new Date().toLocaleTimeString();

        const comuneroCreado: comunerosCreationAttributes = {
            id_comunero: 'com-'+v4(),
            id_barrio: req.body.barrio,
            id_persona: req.body.persona,
            created_date: fecha,
            created_time: hora,
        }
        await comuneros.create(comuneroCreado);
        res.json({
            msg: 'comunero creado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })

    }

}

//obtener personas que son comuneros con su barrio
export const obtenerPersonasComuneros= async (req: Request, res: Response) => {
    try {
        const listComuneros = await db.query('select comuneros.id_comunero, personas.cedula,personas.apellidos,personas.nombre,personas.celular_per,barrios.nom_barrio,comuneros.estado_com,comuneros.calificado from comuneros ' +
            'inner join personas on personas.id_persona=comuneros.id_persona inner join barrios on comuneros.id_barrio=barrios.id_barrio order by personas.apellidos asc ');
        res.json(
            { listComuneros }
        );
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
       
    }
}
export const obtenerPersonasComunerosBarrio = async (req: Request, res: Response) => {
    const idbarrio = req.body.barrio;
    try {
        try {
            const listComuneros = await db.query('select comuneros.id_comunero, personas.cedula,personas.apellidos,personas.nombre,personas.celular_per,barrios.nom_barrio,comuneros.estado_com,comuneros.calificado from comuneros ' +
                'inner join personas on personas.id_persona=comuneros.id_persona inner join barrios on comuneros.id_barrio=barrios.id_barrio where barrios.id_barrio='+idbarrio+' order by personas.apellidos asc ');

                const comuneros=listComuneros[0]
            res.json(
                { comuneros }
            );
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'error inesperado'
            })
           
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
       
    }
}

//obtener personas que no son comuneros
export const obtenerPersonasNoComuneros = async (req: Request, res: Response) => {
    try {
        const listPersonas = await db.query('select p.id_persona,p.nombre,p.apellidos,p.cedula,p.celular_per,p.estado from personas p where p.id_persona not in (select id_persona from comuneros)');
    
        res.json({ listPersonas });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
       
    }
}
//cambiar estado comunero
export const cambiarEstadoComunero = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.body;
        const comunero = await comuneros.findByPk(id);
        //si esta activo lo desactiva y viceversa
        if (comunero) {
            const estado = comunero.estado_com;
            if (estado == 1) {
                comunero.estado_com = 0;
            } else {
                comunero.estado_com = 1;
            }
            await comunero.save();
            res.json({
                msg: 'estado cambiado'
            })
        } else {
            res.status(404).json({
                msg: 'no existe el comunero'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
       
        
    }
}

//añadir asociaicon al comunero
export const agregarAsociacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const comunero = await comuneros.findByPk(id);
        if (comunero) {
            comunero.id_aso = req.body.asociacion;
            await comunero.save();
            res.json({
                msg: 'asociacion agregada'
            })
        } else {
            res.status(404).json({
                msg: 'no existe el comunero'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
       
        
    }
}

//obtener asociaicon del comunero
export const obtenerAsociacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const comunero = await comuneros.findByPk(id);
        if (comunero) {
            //busca la asociacion del comunero
            const asociacion = await asociaciones.findByPk(comunero.id_aso);
            //si tiene asociacion la devuelve
            if (asociacion) {
                res.json({
                    asociacion
                })
            }
            //si no tiene asociacion devuelve null
            else {
                res.json({
                    asociacion: null
                })
            }
            
            

        } else {
            res.status(404).json({
                msg: 'no existe el comunero'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
       
        
    }
}

//obtener comuneros por asociacion
export const obtenerComunerosAsociacion = async (req: Request, res: Response) => {
    try {
        const { asociacion } = req.body;
        const respuesta = await db.query('select comuneros.id_comunero, personas.cedula,personas.apellidos,personas.nombre,personas.celular_per,comuneros.estado_com,comuneros.calificado, asociaciones.nom_asociacion from comuneros ' +
            'inner join personas on personas.id_persona=comuneros.id_persona inner join asociaciones on comuneros.id_aso=asociaciones.id_aso where asociaciones.id_aso ='+asociacion+' order by personas.apellidos asc');
        const comuneros=respuesta[0]
        res.json(
            { comuneros }
        );
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
       
    }
}
//obtener comunero por id
export const obtenerComunero = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const comunero = await comuneros.findOne({
            where: {
                id_comunero: id
            },
            include: [
                {
                    model: personas,
                    as: 'id_persona_persona',
                    attributes: ['nombre', 'apellidos', 'cedula', 'celular_per']
                },
            ]
        });
        if (comunero) {
            res.json({
                comunero
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
       
        
    }
}

