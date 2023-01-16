import{initModels,asociaciones,asociacionesAttributes,asociacionesCreationAttributes}from '../models/init-models';
import {Request,Response} from 'express';
import db from '../db/connection';

initModels(db);

export const crearAsociacion=async(req:Request,res:Response)=>{
    //verificar si existe la asociacion
    const asociacion=await asociaciones.findOne({
        where:{
            NOM_ASOCIACION_:req.body.nombre
        }
    });
    if(asociacion){
        return res.status(400).json({
            msg:'La asociacion ya existe'
        })
    }
    //crear la asociacion
    const asociacionCr:asociacionesCreationAttributes={
        NOM_ASOCIACION_:req.body.nombre,
    }
    await asociaciones.create(asociacionCr);
    res.json({
        msg:'Asociacion creada'
    })
}

export const obtenerAsociaciones=async(req:Request,res:Response)=>{
    const listAsociaciones=await asociaciones.findAll();
    res.json(listAsociaciones);
}

export const eliminarAsociacion=async(req:Request,res:Response)=>{
    const {id}=req.params;
    const asociacion=await asociaciones.findByPk(id);
    if(!asociacion){
        return res.status(404).json({
            msg:'Asociacion no encontrada'
        })
    }
    await asociacion.destroy();
    res.json({
        msg:'Asociacion eliminada'
    })
}

export const actualizarAsociacion=async(req:Request,res:Response)=>{
    const {id}=req.params;
    const asociacion=await asociaciones.findByPk(id);
    if(!asociacion){
        return res.status(404).json({
            msg:'Asociacion no encontrada'
        })
    }
    const asociacionUp:asociacionesCreationAttributes={
        NOM_ASOCIACION_:req.body.nombre,
    }
    await asociacion.update(asociacionUp);
    res.json({
        msg:'Asociacion actualizada'
    })
}
//buscar asociacion por nombre
export const buscarAsociacion=async(req:Request,res:Response)=>{
    const {nombre}=req.params;
    const asociacion=await asociaciones.findOne({
        where:{
            NOM_ASOCIACION_:nombre
        }
    });
    if(!asociacion){
        return res.status(404).json({
            msg:'Asociacion no encontrada'
        })
    }
    res.json(asociacion);
}




