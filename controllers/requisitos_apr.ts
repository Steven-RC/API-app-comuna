import { initModels, requisito_apr,  requisito_aprCreationAttributes } from "../models/init-models";
import { Request, Response } from "express";
import { requisitos } from "../models/requisitos";
import db from "../db/connection";

import {v4} from 'uuid';

initModels(db);

//aprobar requisito
export const aprobarRequisito = async (req: Request, res: Response) => {
    try {
        const fechaApr = new Date().toString();
        const { id_requisito, id_persona, observacion } = req.body;
        //buscar persona    
        const reqApr: requisito_aprCreationAttributes = {
            id_req_ap: v4(),
            id_req: id_requisito,
            id_persona: id_persona,
            observacion: observacion,
            fecha_ap: fechaApr
        }
        await requisito_apr.create(reqApr);
        res.json({
            msg: 'Requisito aprobado con exito'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }
}

//obtener todos los requisitos  y observaciones
export const obtenerRequisitosApr = async (req: Request, res: Response) => {
    try {
        const listRequisitosApr = await requisito_apr.findAll({
            attributes: ['id_req', 'id_persona']
        });
        res.json({
            listRequisitosApr
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }
}

//obtener personas con requisitos aprobados
export const obtenerPersonasApr = async (req: Request, res: Response) => {
    try {
        const reqApr = await requisito_apr.findAll({
            attributes: ['id_persona'],
            include: {
                model: requisitos,
                as: 'id_req_requisito',
                attributes: ['id_req', 'requisito',],


            },

        });
        res.json({
            reqApr
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }
}