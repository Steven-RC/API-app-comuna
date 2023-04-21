import { Request, Response } from 'express';
import db from '../db/connection';
import { initModels, requisitos, requisitosCreationAttributes, requisitosAttributes } from '../models/init-models';
import { v4 } from 'uuid';

initModels(db);


//registrar requisito
export const crearRequisito = async (req: Request, res: Response) => {
    try {
        const { requisito, observacion } = req.body;
        const reqCr: requisitosCreationAttributes = {
            id_req: 'req-'+v4(),
            requisito ,
            observacion,
        }
        await requisitos.create(reqCr);
        res.json({
            msg: 'Requisito creado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }
}

//obtener requisitos
export const obtenerRequisitos = async (req: Request, res: Response) => {
    try {
        const listRequisitos = await requisitos.findAll({
            attributes: ['id_req', 'requisito', 'observacion', 'req_estado'],
        });
        res.json({
            listRequisitos
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })


    }
}
export const obtenerRequisitosActivos= async (req: Request, res: Response) => {
    try {
        const listRequisitos = await requisitos.findAll({
            attributes: ['id_req', 'requisito', 'observacion'],
            where: {
                req_estado: 1
            }
        });
        res.json({
            listRequisitos
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })


    }
}

//actualizar requisito
export const actualizarRequisito = async (req: Request, res: Response) => {

    try {
        const {id_req} = req.body;
        const {requisito} = req.body;
        const {observacion} = req.body;
        const {estado} = req.body;
        console.log(id_req)
        console.log(requisito)
        //actualizar requisito
        await requisitos.update({
             requisito,
             observacion,
             req_estado: estado
        }, {
            where: {
                id_req
            }
        });
        res.json({
            msg: 'Requisito actualizado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}

//obtener requisito por de una persona
export const obtenerRequisitoPersona = async (req: Request, res: Response) => {
    try {
        const listaRequisitos = await db.query("select personas.id_persona,personas.cedula, personas.apellidos, personas.nombre,requisitos.id_req,requisitos.requisito,requisitos.observacion,requisito_apr.fecha_ap " +
            ",requisito_apr.observacion as observacion_ap from ((personas inner join requisito_apr on personas.id_persona = requisito_apr.id_persona) " +
            " inner join requisitos on requisito_apr.id_req = requisitos.id_req) where requisitos.req_estado=1 && personas.id_persona = " + req.body.id_persona);
        //si no hay requisitos
        const listRequisitos = listaRequisitos[0];
        if (listRequisitos.length == 0) {
            //se retotna la lista vacia

            res.json(
                {listRequisitos}
            )
        } else {
            res.json({
                listRequisitos
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}

//obtener personas con requisitos todos los requisitos aprobados
