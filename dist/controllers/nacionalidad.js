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
exports.actualizarNacionalidad = exports.getNacionalidad = exports.getNombresNacionalidades = exports.getNacionalidades = exports.crear = exports.crearNacionalidad = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
const nacionalidad_1 = require("../models/nacionalidad");
const uuid_1 = require("uuid");
(0, init_models_1.initModels)(connection_1.default);
const crearNacionalidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {nacionalidad}=req.body;
    try {
        const encontrarNacionalidad = yield nacionalidad_1.nacionalidad.findOne({
            where: {
                nacionalidad: req.body.nacionalidad
            }
        });
        if (encontrarNacionalidad) {
            return res.status(400).json({
                msg: 'La nacionalidad ya existe'
            });
        }
        else {
            const nacionalidadcr = {
                id_nacionalidad: 'nac-' + (0, uuid_1.v4)(),
                nacionalidad: req.body.nacionalidad,
            };
            yield nacionalidad_1.nacionalidad.create(nacionalidadcr);
            res.status(200).json({
                msg: 'Nacionalidad creada '
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
exports.crearNacionalidad = crearNacionalidad;
const crear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {nacionalidad}=req.body;
    try {
        const nacionalidadEnc = yield nacionalidad_1.nacionalidad.findOne({
            where: {
                nacionalidad: req.body.nacionalidad
            }
        });
        if (nacionalidadEnc) {
            return res.status(400).json({
                msg: 'La nacionalidad ya existe'
            });
        }
        const nacionalidadcr = {
            id_nacionalidad: (0, uuid_1.v4)(),
            nacionalidad: req.body.nacionalidad,
        };
        yield nacionalidad_1.nacionalidad.create(nacionalidadcr);
        res.json({
            msg: 'Nacionalidad creada '
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.crear = crear;
//crear metodo para retornar todas las nacionalidades
const getNacionalidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listNacionalidades = yield nacionalidad_1.nacionalidad.findAll();
        if (listNacionalidades) {
            res.json({ listNacionalidades });
        }
        else {
            res.status(404).json({
                msg: 'No hay nacionalidades'
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
exports.getNacionalidades = getNacionalidades;
//metodo para retorrnar los nombres de las nacionalidades
const getNombresNacionalidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listNacionalidades = yield nacionalidad_1.nacionalidad.findAll({
            attributes: ['nacionalidad']
        });
        if (listNacionalidades) {
            res.json({ listNacionalidades });
        }
        else {
            res.status(404).json({
                msg: 'No hay nacionalidades'
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
exports.getNombresNacionalidades = getNombresNacionalidades;
//crear metodo para retornar una nacionalidad por nombre
const getNacionalidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const encontrarNacionalidad = yield nacionalidad_1.nacionalidad.findOne({
            where: {
                nacionalidad: nombre
            }
        });
        if (encontrarNacionalidad) {
            res.json({ encontrarNacionalidad });
        }
        else {
            res.status(404).json({
                msg: 'Nacionalidad no encontrada'
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
exports.getNacionalidad = getNacionalidad;
//crear metodo para actualizar una nacionalidad
const actualizarNacionalidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const { nomNacionalidad } = req.body;
        const nacionalidadAct = yield nacionalidad_1.nacionalidad.findByPk(id);
        if (!nacionalidadAct) {
            return res.status(404).json({
                msg: 'Nacionalidad no encontrada '
            });
        }
        else {
            yield nacionalidadAct.update({
                id_nacionalidad: id,
                nacionalidad: nomNacionalidad
            });
            res.json({
                msg: 'Nacionalidad actualizada'
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
exports.actualizarNacionalidad = actualizarNacionalidad;
//# sourceMappingURL=nacionalidad.js.map