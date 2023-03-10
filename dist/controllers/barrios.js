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
exports.obtenerComunerosBarrio = exports.actualizarBarrio = exports.eliminarBarrio = exports.obtenerBarrios = exports.crearBarrio = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
const crearBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.barrio) {
            return res.status(400).json({
                msg: 'No hay barrio'
            });
        }
        const encontrarBarrio = yield init_models_1.barrios.findOne({
            where: {
                NOM_BARRIO: req.body.barrio
            }
        });
        if (encontrarBarrio) {
            return res.status(400).json({
                msg: 'El barrio ya existe'
            });
        }
        else {
            const barrio = {
                NOM_BARRIO: req.body.barrio,
            };
            yield init_models_1.barrios.create(barrio);
            res.json({
                msg: 'Barrio creado'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.crearBarrio = crearBarrio;
//obtener barrios
const obtenerBarrios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listbarrios = yield init_models_1.barrios.findAll();
        res.json({
            listbarrios
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerBarrios = obtenerBarrios;
//eliminar barrio
const eliminarBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const barrio = yield init_models_1.barrios.findByPk(id);
        //buscar comunero que este asociado al barrio
        const buscarComunero = yield init_models_1.comuneros.findOne({
            where: {
                ID_BARRIO: id
            }
        });
        if (buscarComunero) {
            return res.status(400).json({
                msg: 'No se puede eliminar el barrio porque tiene comuneros asociados'
            });
        }
        if (!barrio) {
            return res.status(404).json({
                msg: 'No existe el barrio'
            });
        }
        else {
            yield barrio.destroy();
            res.json({
                msg: 'Barrio eliminado'
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
exports.eliminarBarrio = eliminarBarrio;
//actualizar barrio
const actualizarBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const { barrio } = req.body;
        const barrioAct = yield init_models_1.barrios.findByPk(id);
        if (!barrioAct) {
            return res.status(404).json({
                msg: 'No existe el barrio'
            });
        }
        else {
            yield barrioAct.update({
                NOM_BARRIO: barrio
            });
            res.json({
                msg: 'Barrio actualizado'
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
exports.actualizarBarrio = actualizarBarrio;
//obtener todos los comuneros por barrio
const obtenerComunerosBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.anio);
        const anioAc = req.body.anio;
        const comunerosBarrio = yield connection_1.default.query('select barrios.NOM_BARRIO, count(*) as per_por_barrio from comuneros inner join barrios on comuneros.ID_BARRIO = barrios.ID_BARRIO group by barrios.NOM_BARRIO ');
        res.json({
            comunerosBarrio
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerComunerosBarrio = obtenerComunerosBarrio;
//# sourceMappingURL=barrios.js.map