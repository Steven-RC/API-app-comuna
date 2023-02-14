import db from '../db/connection';
import { Request, Response } from "express";
import { initModels,comuneros,barrios, barriosCreationAttributes } from "../models/init-models";

initModels(db);

export const crearBarrio = async (req: Request, res: Response) => {
    try{

        if (!req.body.barrio) {
            return res.status(400).json({
                msg: 'No hay barrio'
            })
        }
        const encontrarBarrio = await barrios.findOne({
            where: {
                NOM_BARRIO: req.body.barrio
            }
        })
        if (encontrarBarrio) {
            return res.status(400).json({
                msg: 'El barrio ya existe'
            })
        } else {
            const barrio: barriosCreationAttributes = {
                NOM_BARRIO: req.body.barrio,
            }
            await barrios.create(barrio);
            res.json({
                msg: 'Barrio creado'
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
    
}
//obtener barrios
export const obtenerBarrios = async (req: Request, res: Response) => {
    try {
        const listbarrios = await barrios.findAll();
        res.json({
            listbarrios
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
    }
}

//eliminar barrio
export const eliminarBarrio = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.params;
        const barrio = await barrios.findByPk(id);
        //buscar comunero que este asociado al barrio
        const buscarComunero = await comuneros.findOne({
            where: {
                ID_BARRIO: id
            }
        })
        if (buscarComunero) {
            return res.status(400).json({
                msg: 'No se puede eliminar el barrio porque tiene comuneros asociados'
            })
        }
    
    
    
        if (!barrio) {
            return res.status(404).json({
                msg: 'No existe el barrio'
            })
        } else {
            await barrio.destroy();
            res.json({
                msg: 'Barrio eliminado' 
            })
    
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
    }
}

//actualizar barrio
export const actualizarBarrio = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.body;
        const { barrio } = req.body;
        const barrioAct = await barrios.findByPk(id);
        if (!barrioAct) {
            return res.status(404).json({
                msg: 'No existe el barrio'
            })
        } else {
            await barrioAct.update({
                NOM_BARRIO: barrio
                 
            })
            res.json({
                msg: 'Barrio actualizado'   
            })
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
                
    }
 
}  

//obtener todos los comuneros por barrio
export const obtenerComunerosBarrio = async (req: Request, res: Response) => { 
    try {
        console.log(req.body.anio)
        const anioAc= req.body.anio
        const comunerosBarrio= await db.query('select barrios.NOM_BARRIO, count(*) as per_por_barrio from comuneros inner join barrios on comuneros.ID_BARRIO = barrios.ID_BARRIO group by barrios.NOM_BARRIO ')
        res.json({
            comunerosBarrio 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
    }
}



