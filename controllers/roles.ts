import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, rol_user, rol_userCreationAttributes } from "../models/init-models";

import { v4 } from 'uuid';

initModels(db);

export const crearRol = async (req: Request, res: Response) => {
    try {
        //crear rol
        const rol: rol_userCreationAttributes = {
            id_rol: 'rol-'+v4(),
            nom_rol: req.body.rol,
        }
        await rol_user.create(rol);
        res.json({
            msg: 'Rol creado'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        });

    }


}
//obtener roles
export const obtenerRoles = async (req: Request, res: Response) => {
    try {
        const roles = await rol_user.findAll();
        res.json({
            roles
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        });


    }
}
//actualizar rol
export const actualizarRol = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const { rol } = req.body;
        await rol_user.update({
            nom_rol: rol
        }, {
            where: {
                id_rol: id
            }
        });
        res.json({
            msg: 'Rol actualizado'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        });

    }
}
