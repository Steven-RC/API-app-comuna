import { initModels, asociacionesAttributes, asociacionesCreationAttributes,Asociaciones } from '../models/init-models';
import { Request, Response } from 'express';
import db from '../db/connection';
// import { Asociaciones } from '../models/asociaciones';

initModels(db);

export const crearAsociacion = async (req: Request, res: Response) => {
    try{
        //verificar si existe la asociacion
        const { nombre } = req.body;
    
        const asociacion = await Asociaciones.findOne({
            where: {
                NOM_ASOCIACION_: nombre
            }
        });
        if (asociacion) {
            return res.status(400).json({
                msg: 'La asociacion ya existe'
            })
        }
        //crear la asociacion
        const asociacionCr: asociacionesCreationAttributes = {
            NOM_ASOCIACION_: nombre,
        }
        await Asociaciones.create(asociacionCr);
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
        const listAsociaciones = await Asociaciones.findAll();
        res.json({ listAsociaciones });
        
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
        const asociacion = await Asociaciones.findByPk(id);
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
        const asociacion = await Asociaciones.findByPk(id);
    
        if (!asociacion) {
            return res.status(404).json({
                msg: 'Asociacion no encontrada'
            })
        }
        const asociacionUp: asociacionesCreationAttributes = {
            NOM_ASOCIACION_: uAsociacion,
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
        const asociacion = await Asociaciones.findOne({
            where: {
                NOM_ASOCIACION_: nombre
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




