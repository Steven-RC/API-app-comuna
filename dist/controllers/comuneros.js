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
exports.obtenerComunero = exports.obtenerComunerosAsociacion = exports.obtenerAsociacion = exports.agregarAsociacion = exports.cambiarEstadoComunero = exports.obtenerPersonasNoComuneros = exports.obtenerPersonasComunerosBarrio = exports.obtenerPersonasComuneros = exports.crearComunero = exports.getComuneros = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
const personas_1 = require("../models/personas");
const asociaciones_1 = require("../models/asociaciones");
const uuid_1 = require("uuid");
(0, init_models_1.initModels)(connection_1.default);
const getComuneros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listComuneros = yield init_models_1.comuneros.findAll();
        if (listComuneros) {
            res.json(listComuneros);
        }
        else {
            res.status(404).json({
                msg: 'no hay comuneros'
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
exports.getComuneros = getComuneros;
const crearComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //si la persona esta en estado inactivo no se puede crear como comunero
        const encontrarPersona = yield personas_1.personas.findOne({
            where: {
                id_persona: req.body.persona,
                estado: 1
            }
        });
        if (!encontrarPersona) {
            return res.status(400).json({
                msg: 'la persona no existe o esta inactiva'
            });
        }
        //si la persona ya es comunero no se puede crear
        const encontrarComunero = yield init_models_1.comuneros.findOne({
            where: {
                id_persona: encontrarPersona.id_persona,
                estado_com: 'activo'
            }
        });
        if (encontrarComunero) {
            return res.status(400).json({
                msg: 'la persona ya es comunero'
            });
        }
        const fecha = new Date().toString();
        const hora = new Date().toLocaleTimeString();
        const comuneroCreado = {
            id_comunero: 'com-' + (0, uuid_1.v4)(),
            id_barrio: req.body.barrio,
            id_persona: req.body.persona,
            created_date: fecha,
            created_time: hora,
        };
        yield init_models_1.comuneros.create(comuneroCreado);
        res.json({
            msg: 'comunero creado'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
        });
    }
});
exports.crearComunero = crearComunero;
//obtener personas que son comuneros con su barrio
const obtenerPersonasComuneros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listComuneros = yield connection_1.default.query('select comuneros.id_comunero, personas.cedula,personas.apellidos,personas.nombre,personas.celular_per,barrios.nom_barrio,comuneros.estado_com,comuneros.calificado from comuneros ' +
            'inner join personas on personas.id_persona=comuneros.id_persona inner join barrios on comuneros.id_barrio=barrios.id_barrio order by personas.apellidos asc ');
        res.json({ listComuneros });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
        });
    }
});
exports.obtenerPersonasComuneros = obtenerPersonasComuneros;
const obtenerPersonasComunerosBarrio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idbarrio = req.body.barrio;
    try {
        try {
            const listComuneros = yield connection_1.default.query('select comuneros.id_comunero, personas.cedula,personas.apellidos,personas.nombre,personas.celular_per,barrios.nom_barrio,comuneros.estado_com,comuneros.calificado from comuneros ' +
                'inner join personas on personas.id_persona=comuneros.id_persona inner join barrios on comuneros.id_barrio=barrios.id_barrio where barrios.id_barrio=' + idbarrio + ' order by personas.apellidos asc ');
            const comuneros = listComuneros[0];
            res.json({ comuneros });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'error inesperado'
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
exports.obtenerPersonasComunerosBarrio = obtenerPersonasComunerosBarrio;
//obtener personas que no son comuneros
const obtenerPersonasNoComuneros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listPersonas = yield connection_1.default.query('select p.id_persona,p.nombre,p.apellidos,p.cedula,p.celular_per,p.estado from personas p where p.id_persona not in (select id_persona from comuneros)');
        res.json({ listPersonas });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
        });
    }
});
exports.obtenerPersonasNoComuneros = obtenerPersonasNoComuneros;
//cambiar estado comunero
const cambiarEstadoComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const comunero = yield init_models_1.comuneros.findByPk(id);
        //si esta activo lo desactiva y viceversa
        if (comunero) {
            const estado = comunero.estado_com;
            if (estado == 1) {
                comunero.estado_com = 0;
            }
            else {
                comunero.estado_com = 1;
            }
            yield comunero.save();
            res.json({
                msg: 'estado cambiado'
            });
        }
        else {
            res.status(404).json({
                msg: 'no existe el comunero'
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
exports.cambiarEstadoComunero = cambiarEstadoComunero;
//añadir asociaicon al comunero
const agregarAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const comunero = yield init_models_1.comuneros.findByPk(id);
        if (comunero) {
            comunero.id_aso = req.body.asociacion;
            yield comunero.save();
            res.json({
                msg: 'asociacion agregada'
            });
        }
        else {
            res.status(404).json({
                msg: 'no existe el comunero'
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
exports.agregarAsociacion = agregarAsociacion;
//obtener asociaicon del comunero
const obtenerAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const comunero = yield init_models_1.comuneros.findByPk(id);
        if (comunero) {
            //busca la asociacion del comunero
            const asociacion = yield asociaciones_1.asociaciones.findByPk(comunero.id_aso);
            //si tiene asociacion la devuelve
            if (asociacion) {
                res.json({
                    asociacion
                });
            }
            //si no tiene asociacion devuelve null
            else {
                res.json({
                    asociacion: null
                });
            }
        }
        else {
            res.status(404).json({
                msg: 'no existe el comunero'
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
exports.obtenerAsociacion = obtenerAsociacion;
//obtener comuneros por asociacion
const obtenerComunerosAsociacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { asociacion } = req.body;
        const respuesta = yield connection_1.default.query('select comuneros.id_comunero, personas.cedula,personas.apellidos,personas.nombre,personas.celular_per,comuneros.estado_com,comuneros.calificado, asociaciones.nom_asociacion from comuneros ' +
            'inner join personas on personas.id_persona=comuneros.id_persona inner join asociaciones on comuneros.id_aso=asociaciones.id_aso where asociaciones.id_aso =' + asociacion + ' order by personas.apellidos asc');
        const comuneros = respuesta[0];
        res.json({ comuneros });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error inesperado'
        });
    }
});
exports.obtenerComunerosAsociacion = obtenerComunerosAsociacion;
//obtener comunero por id
const obtenerComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const comunero = yield init_models_1.comuneros.findOne({
            where: {
                id_comunero: id
            },
            include: [
                {
                    model: personas_1.personas,
                    as: 'id_persona_persona',
                    attributes: ['nombre', 'apellidos', 'cedula', 'celular_per']
                },
            ]
        });
        if (comunero) {
            res.json({
                comunero
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
exports.obtenerComunero = obtenerComunero;
//# sourceMappingURL=comuneros.js.map