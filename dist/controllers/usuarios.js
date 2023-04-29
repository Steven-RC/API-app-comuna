"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImageUser = exports.updateTema = exports.getUserById = exports.createUsuario = exports.resetearContrasena = exports.actualizarUsuario = exports.obtenerRol = exports.obtenerUsuarios = exports.obtenerPerRoles = exports.obtenerPersona = exports.cambiarEstado = exports.actualizarContrasena = exports.verificarToken = exports.obtenerUsuario = void 0;
const init_models_1 = require("../models/init-models");
const init_models_2 = require("../models/init-models");
const bcrypt = __importStar(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const connection_1 = __importDefault(require("../db/connection"));
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
moment_1.default.suppressDeprecationWarnings = true;
const uuid_1 = require("uuid");
const process_1 = require("process");
(0, init_models_1.initModels)(connection_1.default);
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        //obtener usuario por usuario y contraseña
        const { username, password } = req.body;
        // buscar el usuario 
        const busUser = yield init_models_1.usuarios.findOne({
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
            });
        }
        // si existe el usuario comparar contraseñas
        const validPassword = bcrypt.compareSync(password, busUser.pass_user);
        if (!validPassword) {
            return res.status(400).json({
                errorPass: 'Contraseña no valida'
            });
        }
        else if (busUser.estado_user == 0) {
            return res.status(404).json({
                msg: 'El usuario esta deshabilitado'
            });
        }
        else {
            const user = yield init_models_1.usuarios.findOne({
                where: {
                    nom_user: username
                },
                attributes: ['id_usuario', 'id_rol', 'nom_user', 'estado_user', 'id_comunero'],
                include: {
                    model: init_models_2.rol_user,
                    as: 'id_rol_rol_user',
                    attributes: ['nom_rol'],
                }
            });
            //si existe el usuario 
            if (user) {
                //buscar el comunero al que pertenece este usuario
                const comunero = yield init_models_1.comuneros.findOne({
                    where: {
                        id_comunero: user.id_comunero
                    },
                    attributes: ['id_comunero'],
                    include: {
                        model: init_models_1.personas,
                        as: 'id_persona_persona',
                        attributes: ['nombre', 'apellidos']
                    }
                });
                const payload = {
                    exp: Date.now() + 3600000,
                    user: {
                        id: user.id_usuario
                    }
                };
                const secret = process_1.env.SECRET;
                console.log(secret);
                // generar el token
                const token = jsonwebtoken_1.default.sign(payload, secret);
                res.status(200).json({
                    user,
                    comunero,
                    token
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerUsuario = obtenerUsuario;
//verificar el token
const verificarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.verificarToken = verificarToken;
//actualizar email del usuario
const actualizarContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const { contrasena } = req.body;
        const busUser = init_models_1.usuarios.findOne({
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
            });
        }
        else {
            //    actualizar contraseña
            yield init_models_1.usuarios.update({
                pass_user: bcrypt.hashSync(contrasena, 10)
            }, {
                where: {
                    email
                }
            });
            res.json({
                msg: 'la contraseña fue actualizada'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.actualizarContrasena = actualizarContrasena;
//cambiar el estado de el usuario de acitvo a inactivo
const cambiarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreUsuario } = req.body;
        const userCambio = yield init_models_1.usuarios.findOne({
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
            });
        }
        else {
            //    si el estado es 0 cambiar a 1 y viceversa
            if (userCambio.estado_user == 0) {
                yield init_models_1.usuarios.update({
                    estado_user: 1
                }, {
                    where: {
                        nom_user: nombreUsuario
                    }
                });
                res.json({
                    msg: 'el usuario fue activado'
                });
            }
            else {
                yield init_models_1.usuarios.update({
                    estado_user: 0
                }, {
                    where: {
                        nom_user: nombreUsuario
                    }
                });
                res.json({
                    msg: 'el usuario fue desactivado'
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.cambiarEstado = cambiarEstado;
//obtener los datos de la persona a la que pertenece el usuario
const obtenerPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const persona = yield init_models_1.comuneros.findOne({
            where: {
                id_comunero: id
            },
            attributes: ['id_comunero'],
            include: {
                model: init_models_1.personas,
                as: 'id_persona_persona',
                attributes: ['nombre', 'apellidos']
            }
        });
        res.json({
            persona
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerPersona = obtenerPersona;
//obtener personas del cavildo comunal
const obtenerPerRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personasRol = yield connection_1.default.query("select rol_user.nom_rol, personas.nombre,personas.apellidos, personas.titulo_academico from (((usuarios inner join rol_user on usuarios.id_rol=rol_user.id_rol)inner join comuneros on usuarios.id_comunero=comuneros.id_comunero)inner join personas on comuneros.id_persona=personas.id_persona)");
        res.json({
            personasRol
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerPerRoles = obtenerPerRoles;
//obtener todos los usuarios
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listusuarios = yield init_models_1.usuarios.findAll({
            attributes: ['id_usuario', 'nom_user', 'estado_user', 'id_comunero', 'email'],
        });
        res.json({
            listusuarios
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
//obtener rol de usuario
const obtenerRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rol = yield init_models_1.usuarios.findOne({
            where: {
                id_usuario: id
            },
            attributes: ['id_usuario', 'id_rol'],
        });
        res.json({
            rol
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerRol = obtenerRol;
//actualizar usuario
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { usuario } = req.body;
        const id = usuario.id_usuario;
        const nombreUsuario = usuario.nom_user;
        const email = usuario.email;
        const rol = usuario.id_rol;
        const estado = usuario.estado_user;
        const idComunero = usuario.id_comunero;
        const busUser = yield init_models_1.usuarios.findOne({
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
            });
        }
        else {
            //    actualizar usuario
            yield init_models_1.usuarios.update({
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
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
// crear metodo para resetear la contraseña y que sea aleatoria y se envie al correo del usuario
const resetearContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        //generar contraseña aleatoria
        const contrasena = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const busUser = yield init_models_1.usuarios.findOne({
            where: {
                email
            },
            attributes: [
                'id_usuario',
                'email'
            ]
        });
        if (!busUser) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }
        else {
            //    actualizar usuario
            yield init_models_1.usuarios.update({
                pass_user: bcrypt.hashSync(contrasena, 10)
            }, {
                where: {
                    id_usuario: busUser.id_usuario
                }
            });
            //enviar correo con la nueva contraseña
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rosalessteven2001@gmail.com',
                    pass: 'mvbdwdpcsiioibbf'
                }
            });
            const mailOptions = {
                from: 'rosalessteven2001@gmail.com',
                to: busUser.email,
                subject: 'Sistema de gestion Comunal',
                text: 'Estimado' + busUser.nom_user + ' atendiendo a su solicitud se le ha generado una nueva contraseña para el ingreso al sistema de gestion comunal, su nueva contraseña es: ' + contrasena
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('email sent: ' + info.response);
                }
            });
            res.json({
                msg: 'el usuario fue actualizado'
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetearContrasena = resetearContrasena;
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //crear una contraseña aleatoria
        const contrasena = req.body.contrasena;
        console.log(req.body);
        console.log('LLEGO AQUI');
        const nom_user = req.body.usuario;
        const email = req.body.email;
        const rol = req.body.rol;
        const idComunero = req.body.comunero;
        //verificar si el usuario ya existe 
        console.log(nom_user);
        const busUser = yield init_models_1.usuarios.findOne({
            where: {
                nom_user
            }
        });
        if (busUser) {
            return res.status(400).json({
                msg: 'El usuario ya existe'
            });
        }
        // //crear usuario
        const fecha = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        const fechaFormateada = (0, moment_1.default)(fecha).format('YYYY-MM-DD');
        const horaFormateada = (0, moment_1.default)(fecha).format('HH:mm:ss');
        const usuarioCr = {
            id_usuario: 'user-' + (0, uuid_1.v4)(),
            nom_user,
            pass_user: bcrypt.hashSync(contrasena, 10),
            email,
            id_rol: rol,
            id_comunero: idComunero,
            created_at_date: fechaFormateada,
            created_at_time: horaFormateada,
        };
        console.log(usuarioCr);
        yield init_models_1.usuarios.create(usuarioCr);
        res.json({
            msg: 'Usuario creado con exito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.createUsuario = createUsuario;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    console.log(id);
    try {
        const usuario = yield init_models_1.usuarios.findOne({
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
                    model: init_models_1.comuneros,
                    as: 'id_comunero_comunero',
                    attributes: [
                        'id_comunero',
                    ],
                    include: [
                        {
                            model: init_models_1.personas,
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
            });
        }
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.getUserById = getUserById;
//actualizar el tema del usuario
const updateTema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, tema } = req.body;
    try {
        const busUser = yield init_models_1.usuarios.findOne({
            where: {
                id_usuario: id
            }
        });
        if (!busUser) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }
        else {
            //    actualizar usuario
            yield init_models_1.usuarios.update({
                theme: tema
            }, {
                where: {
                    id_usuario: id
                }
            });
            res.json({
                msg: 'el usuario fue actualizado'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.updateTema = updateTema;
const updateImageUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imagen } = req.body;
    const id = req.uid;
    try {
        const busUser = yield init_models_1.usuarios.findOne({
            where: {
                id_usuario: id
            }
        });
        if (!busUser) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }
        else {
            //    actualizar usuario
            yield init_models_1.usuarios.update({
                img: imagen
            }, {
                where: {
                    id_usuario: id
                }
            });
            res.json({
                msg: 'el usuario fue actualizado'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.updateImageUser = updateImageUser;
//# sourceMappingURL=usuarios.js.map