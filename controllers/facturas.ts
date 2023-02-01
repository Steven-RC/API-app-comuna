import { initModels,facturas,facturasAttributes,facturasCreationAttributes } from "../models/init-models";
import { Request, Response } from "express";
import db from "../db/connection";
import fs from 'fs';

initModels(db);

export const obtenerFacturas = async (req:Request,res:Response ) => {
    const listFacturas = await facturas.findAll();
    if (listFacturas){
        res.json({listFacturas});
    }else{
        res.status(404).json({
            msg: 'No hay facturas'
        })
    }

}

//crear factura
export const crearFactura = async (req:Request,res:Response)=>{
    //obtener fecha actual
    const fechaActual = new Date();
    const factura:facturasCreationAttributes = {
        ID_COMUNERO:req.body.id_comunero,
        FECHA:fechaActual.toDateString(),
        HORA:fechaActual.getHours()+":"+fechaActual.getMinutes()+":"+fechaActual.getSeconds(),
        DESCRIP_FAC:req.body.descrip_fac,
        SUBTOTAL_FAC:req.body.subtotal_fac,
        TOTAL_FAC:req.body.total_fac,      
    }
    await facturas.create(factura);
    res.json({
        msg:'Factura creada'

    })
}

//obtener facturas de un comunero
export const obtenerFacturasComunero = async (req:Request,res:Response)=>{
    const id_comunero = req.body.id_comunero;
    const listFacturas = await facturas.findAll({
        where:{
            ID_COMUNERO:id_comunero
        }
    });
    if (listFacturas){
        res.json({listFacturas});
    }else{
        res.status(404).json({
            msg: 'No hay facturas'
        })
    }
    
}