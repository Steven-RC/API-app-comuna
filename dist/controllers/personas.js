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
exports.buscarComunerosPorCedula = exports.obtenerPersonasRequisitosAprobados = exports.cambiarEstadoPersona = exports.actualizarPersona = exports.eliminarPersona = exports.obtenerPersonas = exports.crearPersona = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
const uuid_1 = require("uuid");
(0, init_models_1.initModels)(connection_1.default);
const crearPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //si existe una persona con la misma cedula
        const encontrarPersona = yield init_models_1.personas.findOne({
            where: {
                cedula: req.body.cedula
            }
        });
        if (encontrarPersona) {
            return res.status(400).json({
                msg: 'la persona ya existe'
            });
        }
        else {
            const persona = {
                id_persona: 'per-' + (0, uuid_1.v4)(),
                cedula: req.body.cedula,
                apellidos: req.body.apellidos,
                nombre: req.body.nombre,
                fecha_de_nacimiento: req.body.fecha_nacimiento,
                genero: req.body.genero,
                celular_per: req.body.celular,
                id_nacionalidad: req.body.nacionalidad,
            };
            yield init_models_1.personas.create(persona);
            res.json({
                msg: 'persona creada'
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
exports.crearPersona = crearPersona;
//crear metodo para retornar todas las personas
const obtenerPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listPersonas = yield init_models_1.personas.findAll();
        if (listPersonas) {
            res.json({ listPersonas });
        }
        else {
            res.status(404).json({
                msg: 'no hay personas'
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
exports.obtenerPersonas = obtenerPersonas;
//crear metodo para eliminar una persona
const eliminarPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const encontrarPersona = yield init_models_1.personas.findByPk(id);
        if (!encontrarPersona) {
            return res.status(404).json({
                msg: 'persona no encontrada'
            });
        }
        yield encontrarPersona.destroy();
        res.json({
            msg: 'persona eliminada'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
        });
    }
});
exports.eliminarPersona = eliminarPersona;
//crear metodo para actualizar el nombre de una persona
const actualizarPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //obtener id del body de la persona
        const { id } = req.body;
        //buscar la persona por el id
        const encontrarPersona = yield init_models_1.personas.findByPk(id);
        //si no existe la persona
        if (!encontrarPersona) {
            return res.status(404).json({
                msg: 'persona no encontrada'
            });
        }
        //actualizar el nombre de la persona
        yield encontrarPersona.update({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            fecha_de_nacimiento: req.body.fecha_nacimiento,
            celular_per: req.body.celular,
        });
        res.json({
            msg: 'persona actualizada'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
        });
    }
});
exports.actualizarPersona = actualizarPersona;
//cambiar el estado de una persona
const cambiarEstadoPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //obtener id del body de la persona
        const { id } = req.body;
        //buscar la persona por el id
        const encontrarPersona = yield init_models_1.personas.findByPk(id);
        //si no existe la persona
        if (!encontrarPersona) {
            return res.status(404).json({
                msg: 'persona no encontrada'
            });
        }
        if (encontrarPersona) {
            const estado = encontrarPersona.estado;
            if (estado == 1) {
                encontrarPersona.estado = 0;
            }
            else {
                encontrarPersona.estado = 1;
            }
            yield encontrarPersona.save();
            res.json({
                msg: 'estado actualizado'
            });
        }
        else {
            res.status(404).json({
                msg: 'no se pudo actualizar el estado'
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
                        as: 'id_req_requisito'
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
            msg: 'no hay personas'
        });
    }
});
exports.obtenerPersonasRequisitosAprobados = obtenerPersonasRequisitosAprobados;
//buscar comuneros por cedula
const buscarComunerosPorCedula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula } = req.body;
    console.log(cedula);
    const comunero = yield init_models_1.personas.findOne({
        where: {
            cedula: cedula,
        },
        attributes: ['apellidos', 'nombre', 'celular_per', 'estado'],
        include: [
            {
                model: init_models_1.comuneros,
                as: 'comuneros',
                attributes: ['id_comunero', 'id_terreno'],
                include: [
                    {
                        model: init_models_1.barrios,
                        as: 'id_barrio_barrio',
                        attributes: ['nom_barrio']
                    },
                ]
            },
        ]
    });
    if (comunero) {
        res.json({ comunero });
    }
    else {
        res.status(404).json({
            msg: 'el numero de cedula no existe'
        });
    }
});
exports.buscarComunerosPorCedula = buscarComunerosPorCedula;
//# sourceMappingURL=personas.js.map