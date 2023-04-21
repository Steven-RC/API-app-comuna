import { initModels,  asociacionesCreationAttributes,asociaciones } from '../models/init-models';
import { Request, Response } from 'express';
import db from '../db/connection';
// import { asociaciones } from '../models/asociaciones';

import {v4} from 'uuid';

initModels(db);

export const crearAsociacion = async (req: Request, res: Response) => {
    try{
        //verificar si existe la asociacion
        const { nombre } = req.body;
    
        const asociacion = await asociaciones.findOne({
            where: {
                nom_asociacion: nombre
            }
        });
        if (asociacion) {
            return res.status(400).json({
                msg: 'La asociacion ya existe'
            })
        }
        //crear la asociacion
        const asociacionCr: asociacionesCreationAttributes = {
            id_aso: 'aso-'+v4(),
            nom_asociacion: nombre,
        }
        await asociaciones.create(asociacionCr);
        res.json({
            msg: 'Asociacion creada'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}

export const obtenerAsociaciones = async (req: Request, res: Response) => {
    try {
        const listasociaciones = await asociaciones.findAll();
        res.json({ listasociaciones });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
    }

}

export const eliminarAsociacion = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const asociacion = await asociaciones.findByPk(id);
        if (!asociacion) {
            return res.status(404).json({
                msg: 'Asociacion no encontrada'
            })
        }
        await asociacion.destroy();
        res.json({
            msg: 'Asociacion eliminada'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}

export const actualizarAsociacion = async (req: Request, res: Response) => {
    try{
        const { id } = req.body;
        const { uAsociacion } = req.body;
        const asociacion = await asociaciones.findByPk(id);
    
        if (!asociacion) {
            return res.status(404).json({
                msg: 'Asociacion no encontrada'
            })
        }
        const asociacionUp: asociacionesCreationAttributes = {
            id_aso: id,
            nom_asociacion: uAsociacion,
        }
        await asociacion.update(asociacionUp);
        res.json({
            msg: 'Asociacion actualizada'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}
//buscar asociacion por nombre
export const buscarAsociacion = async (req: Request, res: Response) => {
    try{
        const { nombre } = req.params;
        const asociacion = await asociaciones.findOne({
            where: {
                nom_asociacion: nombre
            }
        });
        if (!asociacion) {
            return res.status(404).json({
                msg: 'Asociacion no encontrada'
            })
        }
        res.json(asociacion);

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}




