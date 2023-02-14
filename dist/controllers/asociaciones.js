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
exports.buscarAsociacion = exports.actualizarAsociacion = exports.eliminarAsociacion = exports.obtenerAsociaciones = exports.crearAsociacion = void 0;
const init_models_1 = require("../models/init-models");
const connection_1 = __importDefault(require("../db/connection"));
// import { Asociaciones } from '../models/asociaciones';
(0, init_models_1.initModels)(connection_1.default);
const crearAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //verificar si existe la asociacion
        const { nombre } = req.body;
        const asociacion = yield init_models_1.Asociaciones.findOne({
            where: {
                NOM_ASOCIACION_: nombre
            }
        });
        if (asociacion) {
            return res.status(400).json({
                msg: 'La asociacion ya existe'
            });
        }
        //crear la asociacion
        const asociacionCr = {
            NOM_ASOCIACION_: nombre,
        };
        yield init_models_1.Asociaciones.create(asociacionCr);
        res.json({
            msg: 'Asociacion creada'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.crearAsociacion = crearAsociacion;
const obtenerAsociaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listAsociaciones = yield init_models_1.Asociaciones.findAll();
        res.json({ listAsociaciones });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerAsociaciones = obtenerAsociaciones;
const eliminarAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const asociacion = yield init_models_1.Asociaciones.findByPk(id);
        if (!asociacion) {
            return res.status(404).json({
                msg: 'Asociacion no encontrada'
            });
        }
        yield asociacion.destroy();
        res.json({
            msg: 'Asociacion eliminada'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.eliminarAsociacion = eliminarAsociacion;
const actualizarAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const { uAsociacion } = req.body;
        const asociacion = yield init_models_1.Asociaciones.findByPk(id);
        if (!asociacion) {
            return res.status(404).json({
                msg: 'Asociacion no encontrada'
            });
        }
        const asociacionUp = {
            NOM_ASOCIACION_: uAsociacion,
        };
        yield asociacion.update(asociacionUp);
        res.json({
            msg: 'Asociacion actualizada'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.actualizarAsociacion = actualizarAsociacion;
//buscar asociacion por nombre
const buscarAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const asociacion = yield init_models_1.Asociaciones.findOne({
            where: {
                NOM_ASOCIACION_: nombre
            }
        });
        if (!asociacion) {
            return res.status(404).json({
                msg: 'Asociacion no encontrada'
            });
        }
        res.json(asociacion);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.buscarAsociacion = buscarAsociacion;
//# sourceMappingURL=asociaciones.js.map