import db from "../db/connection";
import { Request, Response } from "express";
import {anio,comuneros, anioCreationAttributes, initModels,cuota_anual,cuota_anualAttributes,cuota_anualCreationAttributes } from "../models/init-models";


initModels(db);

const crearCuotaAnio = async(nombre:string,valor:number,descripcion:string,anio:number,res:Response)=>{
    try {
        const cuota:cuota_anualCreationAttributes = {
            NOM_CUOTA:nombre,
            VALOR_CUOTA:valor,
            DESCRIPCION:descripcion,
            ID_ANIO:anio
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
        const anioActual = new Date().getFullYear();
        //buscar si existe un año con el año actual
        const encontrarAnio = await anio.findOne({
            where:{
                ANIO:anioActual
            }
        })
        //si no existe el año actual
        if (!encontrarAnio){
           //crear el año actual
            const anioNuevo:anioCreationAttributes = {
                ANIO:anioActual
            }
            await anio.create(anioNuevo);
            //se vuelve a buscar el año actual
            const encontrarAnio = await anio.findOne({
                where:{
                    ANIO:anioActual
                }
            })
            //se crea la cuota
            if(encontrarAnio){
                const id_anio = encontrarAnio.ID_ANIO;
                crearCuotaAnio(req.body.nombre,req.body.valor,req.body.descripcion,id_anio,res);
            }
    
    
    
        }else{
            
            const id_anio = encontrarAnio.ID_ANIO;
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
            NOM_CUOTA:nombre,
            DESCRIPCION:descripcion,
            VALOR_CUOTA:valor
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
        const cuotas = await db.query("select cuota_anual.ID_CUOTA,cuota_anual.NOM_CUOTA,cuota_anual.DESCRIPCION,cuota_anual.VALOR_CUOTA,anio.ANIO as 'AÑO' from (((((personas inner join comuneros on personas.ID_PERSONA=comuneros.ID_PERSONA)" + 
         " inner join facturas on comuneros.ID_COMUNERO = facturas.ID_COMUNERO)" + 
         "inner join cuotas_factura on facturas.ID_FACTURA=cuotas_factura.ID_FACTURA )inner join cuota_anual on cuotas_factura.ID_CUOTA=cuota_anual.ID_CUOTA)inner join anio on cuota_anual.ID_ANIO=anio.ID_ANIO) "+
         "where comuneros.ID_COMUNERO="+req.body.id); 
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
        const cuotas = await db.query("select cuota_anual.ID_CUOTA,cuota_anual.NOM_CUOTA,cuota_anual.DESCRIPCION,cuota_anual.VALOR_CUOTA from cuota_anual where cuota_anual.ID_CUOTA not in (select cuota_anual.ID_CUOTA from (((((personas inner join comuneros on personas.ID_PERSONA=comuneros.ID_PERSONA) inner join facturas on comuneros.ID_COMUNERO = facturas.ID_COMUNERO) inner join cuotas_factura on facturas.ID_FACTURA=cuotas_factura.ID_FACTURA )inner join cuota_anual on cuota_anual.ID_CUOTA= cuotas_factura.ID_CUOTA)inner join anio on cuota_anual.ID_ANIO=anio.ID_ANIO) where comuneros.ID_COMUNERO="+req.body.id+")"); 
        if (cuotas[0].length>0){
            const cuotasCom = cuotas[0];
            res.json({cuotasCom}); 
        }else{ 
            res.status(404).json({
                msg:'No tiene deudas pendientes.'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error inesperado'
        })
        
    }


}
