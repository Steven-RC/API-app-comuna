import { initModels,facturas,facturasCreationAttributes } from "../models/init-models";
import { Request, Response } from "express";
import db from "../db/connection";
import {v4} from 'uuid';

initModels(db);

export const obtenerFacturas = async (req:Request,res:Response ) => {
    try {
        const listFacturas = await facturas.findAll();
        if (listFacturas){
            res.json({listFacturas});
        }else{
            res.status(404).json({
                msg: 'No hay facturas'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
    }

}

//crear factura
export const crearFactura = async (req:Request,res:Response)=>{
    try {
        //obtener fecha actual
        const fechaActual = new Date();
        const factura:facturasCreationAttributes = {
            id_factura:v4(),
            id_comunero:req.body.id_comunero,
            fecha:fechaActual.toDateString(),
            hora:fechaActual.getHours()+":"+fechaActual.getMinutes()+":"+fechaActual.getSeconds(),
            descrip_fac:req.body.descrip_fac,
            subtotal_fac:req.body.subtotal_fac,
            total_fac:req.body.total_fac,      
        }
        await facturas.create(factura);
        res.json({
            msg:'Factura creada'
    
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
    }
}

//obtener facturas de un comunero
export const obtenerFacturasComunero = async (req:Request,res:Response)=>{
    try {
        const id_comunero = req.body.id_comunero;
        const listFacturas = await facturas.findAll({
            where:{
                id_comunero
            }
        });
        if (listFacturas){
            res.json({listFacturas});
        }else{
            res.status(404).json({
                msg: 'No hay facturas'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
        
    }
    
}

//obtener facturas por mes 
export const obtenerFacturasMes = async (req:Request,res:Response)=>{
    try {
        db.query('SET lc_time_names = "es_ES"');
        const facMes= await db.query("select date_format(facturas.fecha, '%m')as mes, month(facturas.fecha) as mes_numero, count(*) as facturas_pagadas from facturas where year(facturas.fecha) group by mes, mes_numero order by mes_numero asc;")
        if (facMes){
            res.json({facMes});
        }else{
            res.status(404).json({
                msg: 'No hay facturas'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
    }
}
    