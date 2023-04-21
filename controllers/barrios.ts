import db from '../db/connection';
import { Request, Response } from "express";
import { initModels,comuneros,barrios, barriosCreationAttributes } from "../models/init-models";
import {v4} from 'uuid';
initModels(db);

export const crearBarrio = async (req: Request, res: Response) => {
    try{

        if (!req.body.barrio) {
            return res.status(400).json({
                msg: 'no hay barrio'
            })
        }
        const encontrarBarrio = await barrios.findOne({
            where: {
                nom_barrio: req.body.barrio
            }
        })
        if (encontrarBarrio) {
            return res.status(400).json({
                msg: 'el barrio ya existe'
            })
        } else {
            const barrio: barriosCreationAttributes = {
                id_barrio:'bar-'+v4(),
                nom_barrio: req.body.barrio,
            }
            await barrios.create(barrio);
            res.json({
                msg: 'barrio creado'
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: 'hable con el administrador'
        })
    }
    
}
//obtener barrios
export const obtenerBarrios = async (req: Request, res: Response) => {
    try {
        const listBarrios = await barrios.findAll();
        res.json({
            listBarrios
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
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
                id_barrio: id
            }
        })
        if (buscarComunero) {
            return res.status(400).json({
                msg: 'no se puede eliminar el barrio porque tiene comuneros asociados'
            })
        }
    
    
    
        if (!barrio) {
            return res.status(404).json({
                msg: 'no existe el barrio'
            })
        } else {
            await barrio.destroy();
            res.json({
                msg: 'barrio eliminado' 
            })
    
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
        
    }
}

//actualizar barrio
export const actualizarBarrio = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.body;
        const { barrio } = req.body;
        const barrioact = await barrios.findByPk(id);
        if (!barrioact) {
            return res.status(404).json({
                msg: 'no existe el barrio'
            })
        } else {
            await barrioact.update({
                nom_barrio: barrio
                 
            })
            res.json({
                msg: 'barrio actualizado'   
            })
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
                
    }
 
}  

//obtener todos los comuneros por barrio
export const obtenerComunerosBarrio = async (req: Request, res: Response) => { 
    try {
        console.log(req.body.anio)
        const anioac= req.body.anio
        const comunerosBarrio= await db.query('select barrios.nom_barrio, count(*) as per_por_barrio from comuneros inner join barrios on comuneros.id_barrio = barrios.id_barrio group by barrios.nom_barrio ')
        res.json({
            comunerosBarrio 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'error inesperado'
        })
        
    }
}



