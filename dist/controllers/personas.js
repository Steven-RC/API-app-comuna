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
exports.obtenerPersonasRequisitosAprobados = exports.cambiarEstadoPersona = exports.actualizarPersona = exports.eliminarPersona = exports.obtenerPersonas = exports.crearPersona = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
const crearPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //si existe una persona con la misma cedula
    const encontrarPersona = yield init_models_1.personas.findOne({
        where: {
            CEDULA: req.body.cedula
        }
    });
    if (encontrarPersona) {
        return res.status(400).json({
            msg: 'La persona ya existe'
        });
    }
    else {
        const persona = {
            CEDULA: req.body.cedula,
            APELLIDOS: req.body.apellidos,
            NOMBRE: req.body.nombre,
            FECHA_DE_NACIMIENTO: req.body.fecha_nacimiento,
            GENERO: req.body.genero,
            CELULAR_PER: req.body.celular,
            ID_NACIONALIDAD: req.body.nacionalidad,
        };
        yield init_models_1.personas.create(persona);
        res.json({
            msg: 'Persona creada'
        });
    }
});
exports.crearPersona = crearPersona;
//crear metodo para retornar todas las personas
const obtenerPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPersonas = yield init_models_1.personas.findAll();
    if (listPersonas) {
        res.json({ listPersonas });
    }
    else {
        res.status(404).json({
            msg: 'No hay personas'
        });
    }
});
exports.obtenerPersonas = obtenerPersonas;
//crear metodo para eliminar una persona
const eliminarPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const encontrarPersona = yield init_models_1.personas.findByPk(id);
    if (!encontrarPersona) {
        return res.status(404).json({
            msg: 'Persona no encontrada'
        });
    }
    yield encontrarPersona.destroy();
    res.json({
        msg: 'Persona eliminada'
    });
});
exports.eliminarPersona = eliminarPersona;
//crear metodo para actualizar el nombre de una persona
const actualizarPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //obtener id del body de la persona
    const { id } = req.body;
    //buscar la persona por el id
    const encontrarPersona = yield init_models_1.personas.findByPk(id);
    //si no existe la persona
    if (!encontrarPersona) {
        return res.status(404).json({
            msg: 'Persona no encontrada'
        });
    }
    //actualizar el nombre de la persona
    yield encontrarPersona.update({
        NOMBRE: req.body.nombre,
        APELLIDOS: req.body.apellidos,
        FECHA_DE_NACIMIENTO: req.body.fecha_nacimiento,
        CELULAR_PER: req.body.celular,
    });
    res.json({
        msg: 'Persona actualizada'
    });
});
exports.actualizarPersona = actualizarPersona;
//cambiar el estado de una persona
const cambiarEstadoPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //obtener id del body de la persona
    const { id } = req.body;
    //buscar la persona por el id
    const encontrarPersona = yield init_models_1.personas.findByPk(id);
    //si no existe la persona
    if (!encontrarPersona) {
        return res.status(404).json({
            msg: 'Persona no encontrada'
        });
    }
    if (encontrarPersona) {
        const estado = encontrarPersona.ESTADO;
        if (estado == 1) {
            encontrarPersona.ESTADO = 0;
        }
        else {
            encontrarPersona.ESTADO = 1;
        }
        yield encontrarPersona.save();
        res.json({
            msg: 'Estado actualizado'
        });
    }
    else {
        res.status(404).json({
            msg: 'No se pudo actualizar el estado'
        });
    }
});
exports.cambiarEstadoPersona = cambiarEstadoPersona;
//obtener personas con todos los requisitos aprobados
const obtenerPersonasRequisitosAprobados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPersonas = yield init_models_1.personas.findAll({
        include: [
            {
                model: init_models_1.requisito_apr,
                as: 'requisito_aprs',
                include: [
                    {
                        model: init_models_1.requisitos,
                        as: 'ID_REQ_requisito'
                    }
                ]
            }
        ]
    });
    if (listPersonas) {
        res.json({ listPersonas });
    }
    else {
        res.status(404).json({
            msg: 'No hay personas'
        });
    }
});
exports.obtenerPersonasRequisitosAprobados = obtenerPersonasRequisitosAprobados;
//# sourceMappingURL=personas.js.map