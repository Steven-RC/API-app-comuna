import { initModels, usuarios, comuneros, usuariosCreationAttributes, personas } from "../models/init-models";
import { Request, Response } from "express";
import { rol_user } from '../models/init-models';
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import db from '../db/connection';
import moment from 'moment';
import jwt from "jsonwebtoken";
moment.suppressDeprecationWarnings = true;



import { v4 } from 'uuid';
import { env } from "process";


initModels(db);


export const obtenerUsuario = async (req: Request, res: Response) => {
    try {

        console.log(req.body)
        //obtener usuario por usuario y contraseña
        const { username, password } = req.body;
        // buscar el usuario 
        const busUser = await usuarios.findOne({
            where: {
                nom_user: username,
            },
            attributes: [
                'pass_user', 'estado_user'
            ]
        });
        // si no existe el usuario
        if (!busUser) {
            return res.status(404).json({
                errorName: 'Usuario no encontrado'
            })
        }
        // si existe el usuario comparar contraseñas
        const validPassword = bcrypt.compareSync(password, busUser.pass_user);
        if (!validPassword) {
            return res.status(400).json({
                errorPass: 'Contraseña no valida'
            })
        } else if (busUser.estado_user == 0) {
            return res.status(404).json({
                msg: 'El usuario esta deshabilitado'
            })
        } else {
            const user = await usuarios.findOne({
                where: {
                    nom_user: username
                },
                attributes: ['id_usuario', 'id_rol', 'nom_user', 'estado_user', 'id_comunero'],

                include: {
                    model: rol_user,
                    as: 'id_rol_rol_user',
                    attributes: ['nom_rol'],
                }
            });
            //si existe el usuario 
            if (user) {
                //buscar el comunero al que pertenece este usuario
                const comunero = await comuneros.findOne({
                    where: {
                        id_comunero: user.id_comunero
                    },
                    attributes: ['id_comunero'],
                    include: {
                        model: personas,
                        as: 'id_persona_persona',
                        attributes: ['nombre', 'apellidos']
                    }
                });
                const payload = {
                    exp : Date.now() + 3600000,
                    user: {
                        id: user.id_usuario
                    }
                }
                const secret = env.SECRET as string;
                console.log(secret)
                // generar el token
                const token = jwt.sign(
                    payload,
                    secret,
                )

                res.status(200).json({
                    user,
                    comunero,
                    token
                })
            
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}

//verificar el token
export const verificarToken = async (req: Request, res: Response) => {

    try {
        //obtener el token del usuario en bearer token
        // const token = req.header('x-token')?.split(' ')[1] || '';
        // const secret = env.SECRET as string;
        // const payload = jwt.verify(token, secret);
        // if(Date.now() > payload.exp){
        //     return res.status(401).json({
        //         msg: 'Token expirado'
        //     })
        // }
        // //buscar el usuario por el id 
        // const user = await usuarios.findOne({
        //     where: {
        //         id_usuario: payload.user.id
        //     },
        //     attributes: ['id_usuario', 'id_rol', 'nom_user', 'estado_user', 'id_comunero'],
        // });
        // //si existe el usuario
        // if (user) {
        //     return res.status(200).json({
        //         user
        //     })
        // }
        // else {
        //     return res.status(404).json({
        //         msg: 'Usuario no encontrado'
        //     })
        // }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}

//actualizar email del usuario
export const actualizarContrasena = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const { contrasena } = req.body;
        const busUser = usuarios.findOne({
            where: {
                email
            },
            attributes: [
                'email',
            ]
        });
        if (!busUser) {
            return res.status(404).json({
                msg: 'email no encontrado'
            })
        }
        else {
            //    actualizar contraseña
            await usuarios.update({
                pass_user: bcrypt.hashSync(contrasena, 10)
            }, {
                where: {
                     email
                }
            });
            res.json({
                msg: 'la contraseña fue actualizada'
            })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}
//cambiar el estado de el usuario de acitvo a inactivo
export const cambiarEstado = async (req: Request, res: Response) => {
    try {

        const { nombreUsuario } = req.body;
        const userCambio = await usuarios.findOne({
            where: {
                nom_user: nombreUsuario
            },
            attributes: [
                'nom_user', 'estado_user', 'id_usuario'
            ]
        });
        if (!userCambio) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            })
        }
        else {
            //    si el estado es 0 cambiar a 1 y viceversa
            if (userCambio.estado_user == 0) {
                await usuarios.update({
                    estado_user: 1
                }, {
                    where: {
                        nom_user: nombreUsuario
                    }
                });
                res.json({
                    msg: 'el usuario fue activado'
                })
            }
            else {
                await usuarios.update({
                    estado_user: 0
                }, {
                    where: {
                        nom_user: nombreUsuario
                    }
                });
                res.json({
                    msg: 'el usuario fue desactivado'
                })
            }

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })


    }

}
//obtener los datos de la persona a la que pertenece el usuario
export const obtenerPersona = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const persona = await comuneros.findOne({
            where: {
                id_comunero: id
            },
            attributes: ['id_comunero'],
            include: {
                model: personas,
                as: 'id_persona_persona',
                attributes: ['nombre', 'apellidos']
            }
        });
        res.json({
            persona
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }
}

//obtener personas del cavildo comunal
export const obtenerPerRoles = async (req: Request, res: Response) => {
    try {
        const personasRol = await db.query("select rol_user.nom_rol, personas.nombre,personas.apellidos, personas.titulo_academico from (((usuarios inner join rol_user on usuarios.id_rol=rol_user.id_rol)inner join comuneros on usuarios.id_comunero=comuneros.id_comunero)inner join personas on comuneros.id_persona=personas.id_persona)")
        res.json({
            personasRol
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}

//obtener todos los usuarios
export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
        const listusuarios = await usuarios.findAll({
            attributes: ['id_usuario', 'nom_user', 'estado_user', 'id_comunero', 'email'],
        })
        res.json({
            listusuarios
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}
//obtener rol de usuario
export const obtenerRol = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rol = await usuarios.findOne({
            where: {
                id_usuario: id
            },
            attributes: ['id_usuario', 'id_rol'],
        })
        res.json({
            rol
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}

//actualizar usuario
export const actualizarUsuario = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { usuario } = req.body;
        const id = usuario.id_usuario;
        const nombreUsuario = usuario.nom_user;
        const email = usuario.email;
        const rol = usuario.id_rol;
        const estado = usuario.estado_user;
        const idComunero = usuario.id_comunero;
        const busUser = await usuarios.findOne({
            where: {
                id_usuario: id
            },
            attributes: [
                'id_usuario',
            ]
        });
        if (!busUser) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            })
        }
        else {
            //    actualizar usuario
            await usuarios.update({
                nom_user: nombreUsuario,
                email: email,
                id_rol: rol,
                estado_user: estado,
                id_comunero: idComunero
            }, {
                where: {
                    id_usuario: id
                }
            });
            res.json({
                msg: 'el usuario fue actualizado'
            })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}

// crear metodo para resetear la contraseña y que sea aleatoria y se envie al correo del usuario
export const resetearContrasena = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        //generar contraseña aleatoria
        const contrasena = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const busUser = await usuarios.findOne({
            where: {
                id_usuario: id
            },
            attributes: [
                'id_usuario',
                'email'
            ]
        });

        if (!busUser) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            })
        }
        else {
            //    actualizar usuario
            await usuarios.update({
                pass_user: bcrypt.hashSync(contrasena, 10)
            }, {
                where: {
                    id_usuario: id
                }
            });
            //enviar correo con la nueva contraseña
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'stevenrosales31@gmail.com',
                    pass: 'uihwfnjofqdiymii'
                }
            });
            const mailOptions = {
                from: 'stevenrosales31@gmail.com',
                to: busUser.email,
                subject: 'Restablecimiento de contraseña',
                text: 'Su nueva contraseña es: ' + contrasena
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('email sent: ' + info.response);
                }
            });
            res.json({
                msg: 'el usuario fue actualizado'
            })


        }
    } catch (error) {

    }
}

export const createUsuario = async (req: Request, res: Response) => {
    try {
        //crear una contraseña aleatoria
        const contrasena = req.body.contrasena;

        console.log(req.body)
        console.log('LLEGO AQUI')
        const nom_user = req.body.usuario;
        const email = req.body.email;
        const rol = req.body.rol;
        const idComunero = req.body.comunero;
        //verificar si el usuario ya existe 
        console.log(nom_user)
        const busUser = await usuarios.findOne({
            where: {
                nom_user
            }
        });
        if (busUser) {
            return res.status(400).json({
                msg: 'El usuario ya existe'
            })
        }

        // //crear usuario
        const fecha = moment().format('YYYY-MM-DD HH:mm:ss');
        const fechaFormateada = moment(fecha).format('YYYY-MM-DD');
        const horaFormateada = moment(fecha).format('HH:mm:ss');
        
        const usuarioCr: usuariosCreationAttributes = {
            id_usuario: 'user-'+v4(),
            nom_user,
            pass_user: bcrypt.hashSync(contrasena, 10),
            email,
            id_rol: rol,
            id_comunero: idComunero,
            created_at_date: fechaFormateada,
            created_at_time: horaFormateada,
        }
        console.log(usuarioCr)
        await usuarios.create(usuarioCr);
        //enviar correo con la nueva contraseña
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'stevenrosales31@gmail.com',
        //         pass: 'uihwfnjofqdiymii'
        //     }
        // });
        // const mailOptions = {
        //     from: 'stevenrosales31@gmail.com',
        //     to: usuarioCr.email,
        //     subject: 'Creacion de usuario',
        //     text: 'Gracias por registrarse en el sistema de la comuna Bambil Collao \n Su usuario es: ' + usuarioCr.nom_user + '\n Su contraseña es: ' + contrasena
        // };
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('email sent: ' + info.response);
        //     }
        // });
        res.json({
            msg: 'Usuario creado con exito'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log(id)
    try {
        const usuario = await usuarios.findOne({
            where: {
                id_usuario: id
            },
            attributes: [
                'id_usuario',
                'nom_user',
                'email',
                'id_rol',
                'id_comunero',
            ],
            include: [
                {
                    model: comuneros,
                    as: 'id_comunero_comunero',
                    attributes: [
                        'id_comunero',
                    ],
                    include: [
                        {
                            model: personas,
                            as: 'id_persona_persona',
                            attributes: [
                                'cedula',
                                'apellidos',
                                'nombre',
                            ]
                        }
                    ]
                }
            ]

        });
        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            })
        }
        res.json({
            usuario
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }
}