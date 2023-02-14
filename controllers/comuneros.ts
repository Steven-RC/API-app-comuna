import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, comuneros, comunerosAttributes, comunerosCreationAttributes, barrios } from "../models/init-models";
import { personas } from '../models/personas';
import * as sequelize from 'sequelize';

initModels(db);

export const getComuneros = async (req: Request, res: Response) => {
    try {
        const listComuneros = await comuneros.findAll();
        if (listComuneros) {
            res.json(listComuneros);
        } else {
            res.status(404).json({
                msg: 'No hay comuneros'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}
export const crearComunero = async (req: Request, res: Response) => {
    try {

        //si la persona esta en estado inactivo no se puede crear como comunero
        const encontrarPersona = await personas.findOne({
            where: {
                ID_PERSONA: req.body.persona,
                ESTADO: 1
            }
        })
        if (!encontrarPersona) {
            return res.status(400).json({
                msg: 'La persona no existe o esta inactiva'
            })
        }
        //si la persona ya es comunero no se puede crear
        const encontrarComunero = await comuneros.findOne({
            where: {
                ID_PERSONA: encontrarPersona.ID_PERSONA,
                ESTADO_COM: 'ACTIVO'
            }
        })
        if (encontrarComunero) {
            return res.status(400).json({
                msg: 'La persona ya es comunero'
            })
        }
        const fecha = new Date().toString();
        const hora = new Date().toLocaleTimeString();

        const comuneroCr: comunerosCreationAttributes = {
            ID_BARRIO: req.body.barrio,
            ID_PERSONA: req.body.persona,
            CREATED_DATE: fecha,
            CREATED_TIME: hora,
        }
        await comuneros.create(comuneroCr);
        res.json({
            msg: 'Comunero creado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}

//obtener personas que son comuneros con su barrio
export const obtenerPersonasComunerosBarrio = async (req: Request, res: Response) => {
    try {
        const listComuneros = await db.query('select comuneros.ID_COMUNERO, personas.CEDULA,personas.APELLIDOS,personas.NOMBRE,personas.CELULAR_PER,barrios.NOM_BARRIO,comuneros.ESTADO_COM,comuneros.CALIFICADO from comuneros ' +
            'inner join personas on personas.ID_PERSONA=comuneros.ID_PERSONA inner join barrios on comuneros.ID_BARRIO=barrios.ID_BARRIO');
        res.json(
            { listComuneros }
        );
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
       
    }
}

//obtener personas que no son comuneros
export const obtenerPersonasNoComuneros = async (req: Request, res: Response) => {
    try {
        const listPersonas = await db.query('select p.ID_PERSONA,p.NOMBRE,p.APELLIDOS,p.CEDULA,p.CELULAR_PER,p.ESTADO from personas p where p.ID_PERSONA not in (select ID_PERSONA from comuneros)');
    
        res.json({ listPersonas });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
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
            const estado = comunero.ESTADO_COM;
            if (estado == 1) {
                comunero.ESTADO_COM = 0;
            } else {
                comunero.ESTADO_COM = 1;
            }
            await comunero.save();
            res.json({
                msg: 'Estado cambiado'
            })
        } else {
            res.status(404).json({
                msg: 'No existe el comunero'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
       
        
    }
}




