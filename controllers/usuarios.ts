import { initModels, usuarios, usuariosCreationAttributes } from "../models/init-models";
import db from '../db/connection';
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { rol_user } from '../models/init-models';

initModels(db);


export const crearUsuario = async (req: Request, res: Response) => {
    const usuarioCr: usuariosCreationAttributes = {
        NOM_USER: req.body.usuario,
        PASS_USER: bcrypt.hashSync(req.body.contrasena, 10),
        EMAIL: req.body.email,
        ID_ROL: req.body.rol,
        ID_COMUNERO: req.body.comunero,
        CREATED_AT_DATE: req.body.fecha,
        CREATED_AT_TIME: req.body.hora
    }
    await usuarios.create(usuarioCr);
    res.json({
        msg: 'Usuario creado'
    })

}

export const obtenerUsuario = async (req: Request, res: Response) => {
    //obtener usuario por usuario y contraseña
    const { usuario, contrasena } = req.body;
    // buscar el usuario 
    const busUser = await usuarios.findOne({
        where: {
            NOM_USER: usuario,
        },
        attributes: [
            'PASS_USER','ESTADO_USER'
        ]
    });
    // si no existe el usuario
    if (!busUser) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        })
    }


    // si existe el usuario comparar contraseñas
    const validPassword = bcrypt.compareSync(contrasena, busUser.PASS_USER);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Contraseña no valida'
        })
    }else if(busUser.ESTADO_USER == 0){
        return res.status(404).json({
            msg: 'El usuario esta deshabilitado'
        })
    }else {
        const user = await usuarios.findOne({
            where: {
                NOM_USER: usuario
            },
            attributes: ['ID_ROL', 'NOM_USER','ESTADO_USER'],

            include: {
                model: rol_user,
                as: 'ID_ROL_rol_user',
                attributes: ['NOM_ROL'],
            }
        });
        // generar el token
        res.json({
            user
        })
    }


}

//actualizar email del usuario
export const actualizarContrasena = async (req: Request, res: Response) => {
    const { email } = req.body;
    const { contrasena } = req.body;
    const busUser = usuarios.findOne({
        where: {
            EMAIL: email
        },
        attributes: [
            'EMAIL',
        ]
    });
    if (!busUser) {
        return res.status(404).json({
            msg: 'Email no encontrado'
        })
    }
    else {
        //    actualizar contraseña
        await usuarios.update({
            PASS_USER: bcrypt.hashSync(contrasena, 10)
        }, {
            where: {
                EMAIL: email
            }
        });
        res.json({
            msg: 'la contraseña fue actualizada'
        })



    }

}
//cambiar el estado de el usuario de acitvo a inactivo
export const cambiarEstado = async (req: Request, res: Response) => {
    const { nombreUsuario } = req.body;
    const userCambio = await usuarios.findOne({
        where: {
            NOM_USER: nombreUsuario
        },
        attributes: [
            'NOM_USER', 'ESTADO_USER', 'ID_USUARIO'
        ]
    });
    if (!userCambio) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        })
    }
    else {
        //    si el estado es 0 cambiar a 1 y viceversa
        if (userCambio.ESTADO_USER == 0) {
            await usuarios.update({
                ESTADO_USER: 1
            }, {
                where: {
                    NOM_USER: nombreUsuario
                }
            });
            res.json({
                msg: 'el usuario fue activado'
            })
        }
        else {
            await usuarios.update({
                ESTADO_USER: 0
            }, {
                where: {
                    NOM_USER: nombreUsuario
                }
            });
            res.json({
                msg: 'el usuario fue desactivado'
            })
        }

    }

}