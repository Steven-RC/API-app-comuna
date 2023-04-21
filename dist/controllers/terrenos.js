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
exports.actualizarTerreno = exports.obtenerTerrenosComunero = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
const init_models_2 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
//obtener terrenos de un comunero
const obtenerTerrenosComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const response = yield connection_1.default.query('select terrenos.id_terreno,terrenos.lim_norte, terrenos.lim_sur, terrenos.lim_este ,' +
            'terrenos.lim_oeste,terrenos.norte,terrenos.sur,terrenos.este,terrenos.oeste from comuneros ' +
            'inner join terrenos on comuneros.id_terreno=terrenos.id_terreno where comuneros.id_comunero =' + id);
        const terreno = response[0];
        if (terreno.length > 0) {
            res.json({
                terreno
            });
        }
        else {
            //retorna un array vacio
            res.json({
                terreno: []
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
exports.obtenerTerrenosComunero = obtenerTerrenosComunero;
//actualizar terreno
const actualizarTerreno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, lim_norte, lim_sur, lim_este, lim_oeste, norte, sur, este, oeste } = req.body;
        const terreno = yield init_models_2.terrenos.findOne({
            where: {
                id_terreno: id
            }
        });
        if (terreno) {
            yield terreno.update({
                lim_norte,
                lim_sur,
                lim_este,
                lim_oeste,
                norte,
                sur,
                este,
                oeste
            });
            res.json({
                msg: 'Terreno actualizado'
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
exports.actualizarTerreno = actualizarTerreno;
//# sourceMappingURL=terrenos.js.map