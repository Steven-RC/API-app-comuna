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
exports.obtenerComuneros = exports.crearComunero = exports.getComuneros = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
const personas_1 = require("../models/personas");
(0, init_models_1.initModels)(connection_1.default);
const getComuneros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listComuneros = yield init_models_1.comuneros.findAll();
    if (listComuneros) {
        res.json(listComuneros);
    }
    else {
        res.status(404).json({
            msg: 'No hay comuneros'
        });
    }
});
exports.getComuneros = getComuneros;
const crearComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comuneroCr = {
        ID_BARRIO: req.body.barrio,
        CALIFICADO: req.body.calificado,
        ID_PERSONA: req.body.persona,
        CREATED_DATE: req.body.fecha,
        CREATED_TIME: req.body.hora,
    };
    yield init_models_1.comuneros.create(comuneroCr);
    res.json({
        msg: 'Comunero creado'
    });
});
exports.crearComunero = crearComunero;
//obtener todos los comuneros con sus valores en la tabla persona y barrio
const obtenerComuneros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listComuneros = yield init_models_1.comuneros.findAll({
        attributes: ['ID_COMUNERO', 'ID_BARRIO', 'CALIFICADO', 'ID_PERSONA', 'CREATED_DATE', 'CREATED_TIME'],
        include: {
            model: personas_1.personas,
            as: 'ID_PERSONA_persona',
            attributes: ['ID_PERSONA', 'NOM_PERSONA', 'APE_PERSONA', 'DNI_PERSONA', 'TELF_PERSONA', 'EMAIL_PERSON'],
        },
    });
    res.json(listComuneros);
});
exports.obtenerComuneros = obtenerComuneros;
//# sourceMappingURL=comuneros.js.map