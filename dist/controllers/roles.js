"use strict";
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
exports.actualizarRol = exports.obtenerRoles = exports.crearRol = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
const crearRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //crear rol
        const rol = {
            NOM_ROL: req.body.rol,
        };
        yield init_models_1.rol_user.create(rol);
        res.json({
            msg: 'Rol creado'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.crearRol = crearRol;
//obtener roles
const obtenerRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield init_models_1.rol_user.findAll();
        res.json({
            roles
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerRoles = obtenerRoles;
//actualizar rol
const actualizarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const { rol } = req.body;
        yield init_models_1.rol_user.update({
            NOM_ROL: rol
        }, {
            where: {
                ID_ROL: id
            }
        });
        res.json({
            msg: 'Rol actualizado'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.actualizarRol = actualizarRol;
//# sourceMappingURL=roles.js.map