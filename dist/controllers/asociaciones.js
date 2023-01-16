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
(0, init_models_1.initModels)(connection_1.default);
const crearAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //verificar si existe la asociacion
    const asociacion = yield init_models_1.asociaciones.findOne({
        where: {
            NOM_ASOCIACION_: req.body.nombre
        }
    });
    if (asociacion) {
        return res.status(400).json({
            msg: 'La asociacion ya existe'
        });
    }
    //crear la asociacion
    const asociacionCr = {
        NOM_ASOCIACION_: req.body.nombre,
    };
    yield init_models_1.asociaciones.create(asociacionCr);
    res.json({
        msg: 'Asociacion creada'
    });
});
exports.crearAsociacion = crearAsociacion;
const obtenerAsociaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listAsociaciones = yield init_models_1.asociaciones.findAll();
    res.json(listAsociaciones);
});
exports.obtenerAsociaciones = obtenerAsociaciones;
const eliminarAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const asociacion = yield init_models_1.asociaciones.findByPk(id);
    if (!asociacion) {
        return res.status(404).json({
            msg: 'Asociacion no encontrada'
        });
    }
    yield asociacion.destroy();
    res.json({
        msg: 'Asociacion eliminada'
    });
});
exports.eliminarAsociacion = eliminarAsociacion;
const actualizarAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const asociacion = yield init_models_1.asociaciones.findByPk(id);
    if (!asociacion) {
        return res.status(404).json({
            msg: 'Asociacion no encontrada'
        });
    }
    const asociacionUp = {
        NOM_ASOCIACION_: req.body.nombre,
    };
    yield asociacion.update(asociacionUp);
    res.json({
        msg: 'Asociacion actualizada'
    });
});
exports.actualizarAsociacion = actualizarAsociacion;
//buscar asociacion por nombre
const buscarAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const asociacion = yield init_models_1.asociaciones.findOne({
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
});
exports.buscarAsociacion = buscarAsociacion;
//# sourceMappingURL=asociaciones.js.map