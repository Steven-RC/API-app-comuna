import { initModels, cuotas_factura, cuotas_facturaCreationAttributes, cuota_anual } from "../models/init-models";
import { Request, Response } from "express";
import db from "../db/connection";

initModels(db);

export const crearCuotaFactura = async (req: Request, res: Response) => {
    try {
        const { id_cuota, id_factura } = req.body;
        const cuotaFactura: cuotas_facturaCreationAttributes = {
            id_cuota,
            id_factura
        }
        await cuotas_factura.create(cuotaFactura);
        res.json({
            msg: 'Cuota de factura creada '

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}

//obtener cuotas de una factura
export const obtenerCuotasFactura = async (req: Request, res: Response) => {
    try {

        const id_factura = req.body.id_factura;
        const listCuotas = await cuotas_factura.findAll({
            where: {
                id_factura
            }, include: [{
                model: cuota_anual,
                as: 'id_cuota_cuota_anual',
                attributes: ['nom_cuota', 'descripcion', 'valor_cuota']
            }]

        });
        if (listCuotas) {
            res.json({ listCuotas });
        } else {
            res.status(404).json({
                msg: 'No hay cuotas'
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })


    }
}
