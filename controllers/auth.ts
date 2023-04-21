import{ Request, Response } from 'express'
import {usuarios} from '../models/usuarios'
import * as bcrypt from 'bcrypt'
import generarJWT from '../helpers/generar-jwt'
import { rol_user } from '../models/rol_user';
import { comuneros } from '../models/comuneros';
import { personas } from '../models/personas';
import AuthRequest from '../interfaces/auth-request';

export const login = async (req: Request, res: Response) => {

    console.log(req.body)
    //si no existe el email o el password
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            msg: 'email o password no son correctos'
        })
    }

    const { email, password } = req.body
    try {
        //verificar si el email existe
        const usuario = await usuarios.findOne(
            {
                 where: { email },
                 attributes : ['id_usuario','nom_user','id_rol','email', 'img','pass_user','estado_user'],
                 include: [{
                    model: rol_user,
                    as: 'id_rol_rol_user',
                    attributes: ['nom_rol']
                },
                {
                    model: comuneros,
                    as: 'id_comunero_comunero',
                    attributes: ['id_comunero'],
                    include: [{
                        model: personas,
                        as: 'id_persona_persona',
                        attributes: ['apellidos','nombre']
                    }],
                }

            ]


        })
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe con ese email'
            })
        }
        //verificar si el usuario esta activo
        if (!usuario.estado_user) {
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            })
        }

        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.pass_user)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña no es correcta'
            })
        }
        //borrar la contraseña del objeto usuario
        
        //generar el JWT
        const token = await generarJWT(usuario.id_usuario)

        return res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador: ' + error
        })
    }
}

//obtener informacion del usuario por el token

export const getUsuario = async (req: Request, res: Response) => {
    const {uid} =(req as unknown as AuthRequest )
    try {
        const usuario = await usuarios.findByPk(uid, {
            attributes : ['id_usuario','nom_user','id_rol','email', 'img','pass_user','estado_user'],
            include: [{
                model: rol_user,
                as: 'id_rol_rol_user',
                attributes: ['nom_rol']
            },
            {
                model: comuneros,
                as: 'id_comunero_comunero',
                attributes: ['id_comunero'],
                include: [{
                    model: personas,
                    as: 'id_persona_persona',
                    attributes: ['apellidos','nombre']
                }],
            }

        ]
        })
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe con ese id'
            })
        }
        //borrar la contraseña del objeto usuario
        //generar el JWT
        return res.json({
            usuario,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador: ' + error
        })
    }
}