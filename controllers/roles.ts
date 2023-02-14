import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, rol_user, rol_userAttributes, rol_userCreationAttributes } from "../models/init-models";

initModels(db);

export const crearRol = async (req: Request, res: Response) => {
    try {
        //crear rol
        const rol: rol_userCreationAttributes = {
            NOM_ROL: req.body.rol,
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
            NOM_ROL: rol
        }, {
            where: {
                ID_ROL: id
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
