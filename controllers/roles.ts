import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, rol_user, rol_userAttributes, rol_userCreationAttributes } from "../models/init-models";

initModels(db);

export const crearRol = async (req: Request, res: Response) => {
    //crear rol
    const rol: rol_userCreationAttributes = {
        NOM_ROL: req.body.rol,
    }
    await rol_user.create(rol);
    res.json({
        msg: 'Rol creado'
    });


}
//obtener roles
export const obtenerRoles = async (req: Request, res: Response) => {
    const roles = await rol_user.findAll();
    res.json({
        roles
    });
}

