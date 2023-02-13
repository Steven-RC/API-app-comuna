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
exports.cambiarEstadoComunero = exports.obtenerPersonasNoComuneros = exports.obtenerPersonasComunerosBarrio = exports.crearComunero = exports.getComuneros = void 0;
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
    //si la persona esta en estado inactivo no se puede crear como comunero
    const encontrarPersona = yield personas_1.personas.findOne({
        where: {
            ID_PERSONA: req.body.persona,
            ESTADO: 1
        }
    });
    if (!encontrarPersona) {
        return res.status(400).json({
            msg: 'La persona no existe o esta inactiva'
        });
    }
    //si la persona ya es comunero no se puede crear
    const encontrarComunero = yield init_models_1.comuneros.findOne({
        where: {
            ID_PERSONA: encontrarPersona.ID_PERSONA,
            ESTADO_COM: 'ACTIVO'
        }
    });
    if (encontrarComunero) {
        return res.status(400).json({
            msg: 'La persona ya es comunero'
        });
    }
    const fecha = new Date().toString();
    const hora = new Date().toLocaleTimeString();
    const comuneroCr = {
        ID_BARRIO: req.body.barrio,
        ID_PERSONA: req.body.persona,
        CREATED_DATE: fecha,
        CREATED_TIME: hora,
    };
    yield init_models_1.comuneros.create(comuneroCr);
    res.json({
        msg: 'Comunero creado'
    });
});
exports.crearComunero = crearComunero;
//obtener personas que son comuneros con su barrio
const obtenerPersonasComunerosBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listComuneros = yield connection_1.default.query('select comuneros.ID_COMUNERO, personas.CEDULA,personas.APELLIDOS,personas.NOMBRE,personas.CELULAR_PER,barrios.NOM_BARRIO,comuneros.ESTADO_COM,comuneros.CALIFICADO from comuneros ' +
        'inner join personas on personas.ID_PERSONA=comuneros.ID_PERSONA inner join barrios on comuneros.ID_BARRIO=barrios.ID_BARRIO');
    res.json({ listComuneros });
});
exports.obtenerPersonasComunerosBarrio = obtenerPersonasComunerosBarrio;
//obtener personas que no son comuneros
const obtenerPersonasNoComuneros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPersonas = yield connection_1.default.query('select p.ID_PERSONA,p.NOMBRE,p.APELLIDOS,p.CEDULA,p.CELULAR_PER,p.ESTADO from personas p where p.ID_PERSONA not in (select ID_PERSONA from comuneros)');
    res.json({ listPersonas });
});
exports.obtenerPersonasNoComuneros = obtenerPersonasNoComuneros;
//cambiar estado comunero
const cambiarEstadoComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const comunero = yield init_models_1.comuneros.findByPk(id);
    //si esta activo lo desactiva y viceversa
    if (comunero) {
        const estado = comunero.ESTADO_COM;
        if (estado == 1) {
            comunero.ESTADO_COM = 0;
        }
        else {
            comunero.ESTADO_COM = 1;
        }
        yield comunero.save();
        res.json({
            msg: 'Estado cambiado'
        });
    }
    else {
        res.status(404).json({
            msg: 'No existe el comunero'
        });
    }
});
exports.cambiarEstadoComunero = cambiarEstadoComunero;
//# sourceMappingURL=comuneros.js.map