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
exports.obtenerBarrios = exports.crearBarrio = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
const crearBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.crearBarrio = crearBarrio;
//obtener barrios
const obtenerBarrios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listbarrios = yield init_models_1.barrios.findAll({});
    res.json({
        listbarrios
    });
});
exports.obtenerBarrios = obtenerBarrios;
//# sourceMappingURL=barrios.js.map