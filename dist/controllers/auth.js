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
exports.updatePassword = exports.getUsuario = exports.login = void 0;
const usuarios_1 = require("../models/usuarios");
const bcrypt = __importStar(require("bcrypt"));
const generar_jwt_1 = __importDefault(require("../helpers/generar-jwt"));
const rol_user_1 = require("../models/rol_user");
const comuneros_1 = require("../models/comuneros");
const personas_1 = require("../models/personas");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    //si no existe el email o el password
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'Debe ingresar su Correo y Contraseña'
        });
    }
    const { email, password } = req.body;
    try {
        //verificar si el email existe
        const usuario = yield usuarios_1.usuarios.findOne({
            where: { email },
            attributes: ['id_usuario', 'nom_user', 'id_rol', 'email', 'img', 'pass_user', 'estado_user', 'theme'],
            include: [{
                    model: rol_user_1.rol_user,
                    as: 'id_rol_rol_user',
                    attributes: ['nom_rol']
                },
                {
                    model: comuneros_1.comuneros,
                    as: 'id_comunero_comunero',
                    attributes: ['id_comunero'],
                    include: [{
                            model: personas_1.personas,
                            as: 'id_persona_persona',
                            attributes: ['apellidos', 'nombre']
                        }],
                },
            ]
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe con ese email'
            });
        }
        //verificar si el usuario esta activo
        if (!usuario.estado_user) {
            return res.status(400).json({
                msg: 'El usuario no esta activo'
            });
        }
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.pass_user);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña no es correcta'
            });
        }
        //borrar la contraseña del objeto usuario
        //generar el JWT
        const token = yield (0, generar_jwt_1.default)(usuario.id_usuario);
        return res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador: ' + error
        });
    }
});
exports.login = login;
//obtener informacion del usuario por el token
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    try {
        const usuario = yield usuarios_1.usuarios.findByPk(uid, {
            attributes: ['id_usuario', 'nom_user', 'id_rol', 'email', 'img', 'pass_user', 'estado_user', 'theme'],
            include: [{
                    model: rol_user_1.rol_user,
                    as: 'id_rol_rol_user',
                    attributes: ['nom_rol']
                },
                {
                    model: comuneros_1.comuneros,
                    as: 'id_comunero_comunero',
                    attributes: ['id_comunero'],
                    include: [{
                            model: personas_1.personas,
                            as: 'id_persona_persona',
                            attributes: ['apellidos', 'nombre']
                        }],
                }
            ]
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe con ese id'
            });
        }
        //borrar la contraseña del objeto usuario
        //generar el JWT
        return res.json({
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador: ' + error
        });
    }
});
exports.getUsuario = getUsuario;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.uid + ' Desde mostrar Actualizar contraseña');
    const id_usuario = req.uid;
    const { lastPassword } = req.body;
    const { newPassword } = req.body;
    console.log({
        lastPassword,
        newPassword
    });
    try {
        const usuario = yield usuarios_1.usuarios.findByPk(id_usuario);
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe con ese id'
            });
        }
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(lastPassword, usuario.pass_user);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña no es correcta'
            });
        }
        //actualizar la contraseña
        usuario.pass_user = bcrypt.hashSync(newPassword, 10);
        yield usuario.save();
        //generar el JWT
        const token = yield (0, generar_jwt_1.default)(usuario.id_usuario);
        return res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador: ' + error
        });
    }
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=auth.js.map