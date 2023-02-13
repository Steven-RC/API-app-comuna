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
exports.obtenerAnios = exports.crearAnio = void 0;
const anio_1 = require("../models/anio");
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
//crear anio
const crearAnio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //obtener el ultimo anio
    const anioActual = yield anio_1.anio.findOne({
        order: [
            ['ID_ANIO', 'DESC']
        ]
    });
    //obtener el anio actual
    const anioActualNumber = anioActual === null || anioActual === void 0 ? void 0 : anioActual.ANIO;
    //sumarle 1 al anio actual
    const anioNuevo = anioActualNumber + 1;
    //crear el anio
    const anioNuevoCreado = {
        ANIO: anioNuevo
    };
    yield anio_1.anio.create(anioNuevoCreado);
    res.json({
        msg: 'Anio creado'
    });
});
exports.crearAnio = crearAnio;
//obtener anios
const obtenerAnios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const anios = yield anio_1.anio.findAll();
    res.json({
        anios
    });
});
exports.obtenerAnios = obtenerAnios;
//# sourceMappingURL=anio.js.map