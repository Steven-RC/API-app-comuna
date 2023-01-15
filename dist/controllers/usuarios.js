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
exports.cambiarEstado = exports.actualizarContrasena = exports.obtenerUsuario = exports.crearUsuario = void 0;
const init_models_1 = require("../models/init-models");
const connection_1 = __importDefault(require("../db/connection"));
const bcrypt = __importStar(require("bcrypt"));
const init_models_2 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioCr = {
        NOM_USER: req.body.usuario,
        PASS_USER: bcrypt.hashSync(req.body.contrasena, 10),
        EMAIL: req.body.email,
        ID_ROL: req.body.rol,
        ID_COMUNERO: req.body.comunero,
        CREATED_AT_DATE: req.body.fecha,
        CREATED_AT_TIME: req.body.hora
    };
    yield init_models_1.usuarios.create(usuarioCr);
    res.json({
        msg: 'Usuario creado'
    });
});
exports.crearUsuario = crearUsuario;
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //obtener usuario por usuario y contraseña
    const { usuario, contrasena } = req.body;
    // buscar el usuario 
    const busUser = yield init_models_1.usuarios.findOne({
        where: {
            NOM_USER: usuario,
        },
        attributes: [
            'PASS_USER', 'ESTADO_USER'
        ]
    });
    // si no existe el usuario
    if (!busUser) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        });
    }
    // si existe el usuario comparar contraseñas
    const validPassword = bcrypt.compareSync(contrasena, busUser.PASS_USER);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Contraseña no valida'
        });
    }
    else if (busUser.ESTADO_USER == 0) {
        return res.status(404).json({
            msg: 'El usuario esta deshabilitado'
        });
    }
    else {
        const user = yield init_models_1.usuarios.findOne({
            where: {
                NOM_USER: usuario
            },
            attributes: ['ID_ROL', 'NOM_USER', 'ESTADO_USER'],
            include: {
                model: init_models_2.rol_user,
                as: 'ID_ROL_rol_user',
                attributes: ['NOM_ROL'],
            }
        });
        // generar el token
        res.json({
            user
        });
    }
});
exports.obtenerUsuario = obtenerUsuario;
//actualizar email del usuario
const actualizarContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { contrasena } = req.body;
    const busUser = init_models_1.usuarios.findOne({
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
        });
    }
    else {
        //    actualizar contraseña
        yield init_models_1.usuarios.update({
            PASS_USER: bcrypt.hashSync(contrasena, 10)
        }, {
            where: {
                EMAIL: email
            }
        });
        res.json({
            msg: 'la contraseña fue actualizada'
        });
    }
});
exports.actualizarContrasena = actualizarContrasena;
//cambiar el estado de el usuario de acitvo a inactivo
const cambiarEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreUsuario } = req.body;
    const userCambio = yield init_models_1.usuarios.findOne({
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
        });
    }
    else {
        //    si el estado es 0 cambiar a 1 y viceversa
        if (userCambio.ESTADO_USER == 0) {
            yield init_models_1.usuarios.update({
                ESTADO_USER: 1
            }, {
                where: {
                    NOM_USER: nombreUsuario
                }
            });
            res.json({
                msg: 'el usuario fue activado'
            });
        }
        else {
            yield init_models_1.usuarios.update({
                ESTADO_USER: 0
            }, {
                where: {
                    NOM_USER: nombreUsuario
                }
            });
            res.json({
                msg: 'el usuario fue desactivado'
            });
        }
    }
});
exports.cambiarEstado = cambiarEstado;
//# sourceMappingURL=usuarios.js.map