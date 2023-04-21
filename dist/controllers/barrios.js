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
const uuid_1 = require("uuid");
(0, init_models_1.initModels)(connection_1.default);
const crearBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.barrio) {
            return res.status(400).json({
                msg: 'no hay barrio'
            });
        }
        const encontrarBarrio = yield init_models_1.barrios.findOne({
            where: {
                nom_barrio: req.body.barrio
            }
        });
        if (encontrarBarrio) {
            return res.status(400).json({
                msg: 'el barrio ya existe'
            });
        }
        else {
            const barrio = {
                id_barrio: 'bar-' + (0, uuid_1.v4)(),
                nom_barrio: req.body.barrio,
            };
            yield init_models_1.barrios.create(barrio);
            res.json({
                msg: 'barrio creado'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el administrador'
        });
    }
});
exports.crearBarrio = crearBarrio;
//obtener barrios
const obtenerBarrios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listBarrios = yield init_models_1.barrios.findAll();
        res.json({
            listBarrios
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
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
                id_barrio: id
            }
        });
        if (buscarComunero) {
            return res.status(400).json({
                msg: 'no se puede eliminar el barrio porque tiene comuneros asociados'
            });
        }
        if (!barrio) {
            return res.status(404).json({
                msg: 'no existe el barrio'
            });
        }
        else {
            yield barrio.destroy();
            res.json({
                msg: 'barrio eliminado'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
        });
    }
});
exports.eliminarBarrio = eliminarBarrio;
//actualizar barrio
const actualizarBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const { barrio } = req.body;
        const barrioact = yield init_models_1.barrios.findByPk(id);
        if (!barrioact) {
            return res.status(404).json({
                msg: 'no existe el barrio'
            });
        }
        else {
            yield barrioact.update({
                nom_barrio: barrio
            });
            res.json({
                msg: 'barrio actualizado'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
        });
    }
});
exports.actualizarBarrio = actualizarBarrio;
//obtener todos los comuneros por barrio
const obtenerComunerosBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.anio);
        const anioac = req.body.anio;
        const comunerosBarrio = yield connection_1.default.query('select barrios.nom_barrio, count(*) as per_por_barrio from comuneros inner join barrios on comuneros.id_barrio = barrios.id_barrio group by barrios.nom_barrio ');
        res.json({
            comunerosBarrio
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
        });
    }
});
exports.obtenerComunerosBarrio = obtenerComunerosBarrio;
//# sourceMappingURL=barrios.js.map