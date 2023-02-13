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
exports.obtenerRequisitoPersona = exports.cambiarEstadoRequisito = exports.actualizarRequisito = exports.obtenerRequisitos = exports.crearRequisito = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
//registrar requisito
const crearRequisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requisito, observacion } = req.body;
    const reqCr = {
        REQUISITO: requisito,
        OBSERVACION: observacion,
    };
    yield init_models_1.requisitos.create(reqCr);
    res.json({
        msg: 'Requisito creado'
    });
});
exports.crearRequisito = crearRequisito;
//obtener requisitos
const obtenerRequisitos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRequisitos = yield init_models_1.requisitos.findAll({
        attributes: ['ID_REQ', 'REQUISITO', 'OBSERVACION']
    });
    res.json({
        listRequisitos
    });
});
exports.obtenerRequisitos = obtenerRequisitos;
//actualizar requisito
const actualizarRequisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_requisito, requisito, observacion } = req.body;
    //actualizar requisito
    yield init_models_1.requisitos.update({
        REQUISITO: requisito,
        OBSERVACION: observacion
    }, {
        where: {
            ID_REQ: id_requisito
        }
    });
    res.json({
        msg: 'Requisito actualizado'
    });
});
exports.actualizarRequisito = actualizarRequisito;
//cambiar estado requisito
const cambiarEstadoRequisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_requisito, estado } = req.body;
    yield init_models_1.requisitos.update({
        REQ_ESTADO: estado
    }, {
        where: {
            ID_REQ: id_requisito
        }
    });
    res.json({
        msg: 'Estado actualizado'
    });
});
exports.cambiarEstadoRequisito = cambiarEstadoRequisito;
//obtener requisito por de una persona
const obtenerRequisitoPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRequisitos = yield connection_1.default.query("select personas.ID_PERSONA,personas.CEDULA, personas.APELLIDOS, personas.NOMBRE,requisitos.ID_REQ,requisitos.REQUISITO,requisitos.OBSERVACION,requisito_apr.FECHA_AP " +
        " from ((personas inner join requisito_apr on personas.ID_PERSONA = requisito_apr.ID_PERSONA) " +
        " inner join requisitos on requisito_apr.ID_REQ = requisitos.ID_REQ) where personas.ID_PERSONA = " + req.body.id_persona);
    //si no hay requisitos
    if (listRequisitos[0].length == 0) {
        res.status(404).json({
            msg: 'La persona no tiene requisitos aprobados'
        });
    }
    else {
        res.json({
            listRequisitos
        });
    }
});
exports.obtenerRequisitoPersona = obtenerRequisitoPersona;
//obtener personas con requisitos todos los requisitos aprobados
//# sourceMappingURL=requisitos.js.map