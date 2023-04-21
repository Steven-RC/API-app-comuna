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
exports.obtenerRequisitoPersona = exports.actualizarRequisito = exports.obtenerRequisitosActivos = exports.obtenerRequisitos = exports.crearRequisito = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
const uuid_1 = require("uuid");
(0, init_models_1.initModels)(connection_1.default);
//registrar requisito
const crearRequisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requisito, observacion } = req.body;
        const reqCr = {
            id_req: 'req-' + (0, uuid_1.v4)(),
            requisito,
            observacion,
        };
        yield init_models_1.requisitos.create(reqCr);
        res.json({
            msg: 'Requisito creado'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.crearRequisito = crearRequisito;
//obtener requisitos
const obtenerRequisitos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listRequisitos = yield init_models_1.requisitos.findAll({
            attributes: ['id_req', 'requisito', 'observacion', 'req_estado'],
        });
        res.json({
            listRequisitos
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerRequisitos = obtenerRequisitos;
const obtenerRequisitosActivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listRequisitos = yield init_models_1.requisitos.findAll({
            attributes: ['id_req', 'requisito', 'observacion'],
            where: {
                req_estado: 1
            }
        });
        res.json({
            listRequisitos
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerRequisitosActivos = obtenerRequisitosActivos;
//actualizar requisito
const actualizarRequisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_req } = req.body;
        const { requisito } = req.body;
        const { observacion } = req.body;
        const { estado } = req.body;
        console.log(id_req);
        console.log(requisito);
        //actualizar requisito
        yield init_models_1.requisitos.update({
            requisito,
            observacion,
            req_estado: estado
        }, {
            where: {
                id_req
            }
        });
        res.json({
            msg: 'Requisito actualizado'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.actualizarRequisito = actualizarRequisito;
//obtener requisito por de una persona
const obtenerRequisitoPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaRequisitos = yield connection_1.default.query("select personas.id_persona,personas.cedula, personas.apellidos, personas.nombre,requisitos.id_req,requisitos.requisito,requisitos.observacion,requisito_apr.fecha_ap " +
            ",requisito_apr.observacion as observacion_ap from ((personas inner join requisito_apr on personas.id_persona = requisito_apr.id_persona) " +
            " inner join requisitos on requisito_apr.id_req = requisitos.id_req) where requisitos.req_estado=1 && personas.id_persona = " + req.body.id_persona);
        //si no hay requisitos
        const listRequisitos = listaRequisitos[0];
        if (listRequisitos.length == 0) {
            //se retotna la lista vacia
            res.json({ listRequisitos });
        }
        else {
            res.json({
                listRequisitos
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
exports.obtenerRequisitoPersona = obtenerRequisitoPersona;
//obtener personas con requisitos todos los requisitos aprobados
//# sourceMappingURL=requisitos.js.map