import db from "../db/connection";
import { Request, Response } from "express";
import {anio,comuneros, anioCreationAttributes, initModels,cuota_anual,cuota_anualAttributes,cuota_anualCreationAttributes } from "../models/init-models";

import {v4} from 'uuid';


initModels(db);

const crearCuotaAnio = async(nombre:string,valor:number,descripcion:string,anio:string,res:Response)=>{
    try {
        const cuota:cuota_anualCreationAttributes = {
            id_cuota:v4(),
            nom_cuota:nombre,
            valor_cuota:valor,
            descripcion:descripcion,
            id_anio:anio
        }
        await cuota_anual.create(cuota);
        res.json({
            msg:'Cuota creada'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error inesperado'
        })
        
    }
}

export const obtenerCuotas = async (req:Request,res:Response ) => {
    try {
        const listCuotas = await cuota_anual.findAll();
        if (listCuotas){
            res.json({listCuotas});
        }else{
            res.status(404).json({
                msg: 'No hay cuotas'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error inesperado'
        })
        
    }

}

//registrar cuota
export const crearCuota = async (req:Request,res:Response)=>{
    try {
        
        //crear variable para obtener el año actual
        const anioActual = new Date().getFullYear().toString();
        //buscar si existe un año con el año actual
        const encontrarAnio = await anio.findOne({
            where:{
                anio:anioActual
            }
        })
        //si no existe el año actual
        if (!encontrarAnio){
           //crear el año actual
            const anioNuevo:anioCreationAttributes = {
                id_anio:v4(),
                anio:anioActual
            }
            await anio.create(anioNuevo);
            //se vuelve a buscar el año actual
            const encontrarAnio = await anio.findOne({
                where:{
                    anio:anioActual
                }
            })
            //se crea la cuota
            if(encontrarAnio){
                const id_anio = encontrarAnio.id_anio;
                crearCuotaAnio(req.body.nombre,req.body.valor,req.body.descripcion,id_anio,res);
            }
    
    
    
        }else{
            
            const id_anio = encontrarAnio.id_anio;
            crearCuotaAnio(req.body.nombre,req.body.valor,req.body.descripcion,id_anio,res);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error inesperado'
        })
        
    }
}


//actualizar nombre, descripcion y valor de la cuota
export const actualizarCuota = async (req:Request,res:Response)=>{
    try {
        const{id,nombre,descripcion,valor} = req.body;
        const encontrarCuota = await cuota_anual.findByPk(id);
        if (!encontrarCuota){
            return res.status(404).json({
                msg:'Cuota no encontrada'
            })
        }
        await encontrarCuota.update({
            nom_cuota:nombre,
            descripcion:descripcion,
            valor_cuota:valor
        })
        res.json({
            msg:'Cuota actualizada'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error inesperado'
        })
        
    }
}

//obtener cuotas de un comunero
export const obtenerCuotasComunero = async (req:Request,res:Response)=>{
    try {
        const cuotas = await db.query("select cuota_anual.id_cuota,cuota_anual.nom_cuota,cuota_anual.descripcion,cuota_anual.valor_cuota,anio.anio as 'año' from (((((personas inner join comuneros on personas.id_persona=comuneros.id_persona)" + 
         " inner join facturas on comuneros.id_comunero = facturas.id_comunero)" + 
         "inner join cuotas_factura on facturas.id_factura=cuotas_factura.id_factura )inner join cuota_anual on cuotas_factura.id_cuota=cuota_anual.id_cuota)inner join anio on cuota_anual.id_anio=anio.id_anio) "+
         "where comuneros.id_comunero="+req.body.id); 
        if (cuotas[0].length>0){
            const cuotasCom = cuotas[0];
            res.json({cuotasCom}); 
        }else{
            res.status(404).json({
                msg:'El comunero no ha pagado ninguna cuota'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error inesperado'
        })
        
    }


}
export const obtenerCuotasDeudaComunero = async (req:Request,res:Response)=>{
    try {
        
        //buscar si existe el comunero
        const encontrarComunero = await comuneros.findByPk(req.body.id);
        //si no existe el comunero
        if (!encontrarComunero){
            return res.status(404).json({
                msg:'El comunero no existe'
            })
        }
        //obtener las cuotas que no ha pagado el comunero
        const cuotas = await db.query("select cuota_anual.id_cuota,cuota_anual.nom_cuota,cuota_anual.descripcion,cuota_anual.valor_cuota from cuota_anual where cuota_anual.id_cuota not in (select cuota_anual.id_cuota from (((((personas inner join comuneros on personas.id_persona=comuneros.id_persona) inner join facturas on comuneros.id_comunero = facturas.id_comunero) inner join cuotas_factura on facturas.id_factura=cuotas_factura.id_factura )inner join cuota_anual on cuota_anual.id_cuota= cuotas_factura.id_cuota)inner join anio on cuota_anual.id_anio=anio.id_anio) where comuneros.id_comunero="+req.body.id+")"); 
        if (cuotas[0].length>0){
            const cuotasCom = cuotas[0];
            res.json({cuotasCom}); 
        }else{ 
            //retorbar un arreglo vacio
            const cuotasCom = cuotas[0];
            res.json({cuotasCom});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error inesperado'
        })
        
    }


}
