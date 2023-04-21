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
exports.obtenerCuotasDeudaComunero = exports.obtenerCuotasComunero = exports.actualizarCuota = exports.crearCuota = exports.obtenerCuotas = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
const uuid_1 = require("uuid");
(0, init_models_1.initModels)(connection_1.default);
const crearCuotaAnio = (nombre, valor, descripcion, anio, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cuota = {
            id_cuota: (0, uuid_1.v4)(),
            nom_cuota: nombre,
            valor_cuota: valor,
            descripcion: descripcion,
            id_anio: anio
        };
        yield init_models_1.cuota_anual.create(cuota);
        res.json({
            msg: 'Cuota creada'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
const obtenerCuotas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listCuotas = yield init_models_1.cuota_anual.findAll();
        if (listCuotas) {
            res.json({ listCuotas });
        }
        else {
            res.status(404).json({
                msg: 'No hay cuotas'
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
exports.obtenerCuotas = obtenerCuotas;
//registrar cuota
const crearCuota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //crear variable para obtener el año actual
        const anioActual = new Date().getFullYear().toString();
        //buscar si existe un año con el año actual
        const encontrarAnio = yield init_models_1.anio.findOne({
            where: {
                anio: anioActual
            }
        });
        //si no existe el año actual
        if (!encontrarAnio) {
            //crear el año actual
            const anioNuevo = {
                id_anio: (0, uuid_1.v4)(),
                anio: anioActual
            };
            yield init_models_1.anio.create(anioNuevo);
            //se vuelve a buscar el año actual
            const encontrarAnio = yield init_models_1.anio.findOne({
                where: {
                    anio: anioActual
                }
            });
            //se crea la cuota
            if (encontrarAnio) {
                const id_anio = encontrarAnio.id_anio;
                crearCuotaAnio(req.body.nombre, req.body.valor, req.body.descripcion, id_anio, res);
            }
        }
        else {
            const id_anio = encontrarAnio.id_anio;
            crearCuotaAnio(req.body.nombre, req.body.valor, req.body.descripcion, id_anio, res);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.crearCuota = crearCuota;
//actualizar nombre, descripcion y valor de la cuota
const actualizarCuota = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, descripcion, valor } = req.body;
        const encontrarCuota = yield init_models_1.cuota_anual.findByPk(id);
        if (!encontrarCuota) {
            return res.status(404).json({
                msg: 'Cuota no encontrada'
            });
        }
        yield encontrarCuota.update({
            nom_cuota: nombre,
            descripcion: descripcion,
            valor_cuota: valor
        });
        res.json({
            msg: 'Cuota actualizada'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.actualizarCuota = actualizarCuota;
//obtener cuotas de un comunero
const obtenerCuotasComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cuotas = yield connection_1.default.query("select cuota_anual.id_cuota,cuota_anual.nom_cuota,cuota_anual.descripcion,cuota_anual.valor_cuota,anio.anio as 'año' from (((((personas inner join comuneros on personas.id_persona=comuneros.id_persona)" +
            " inner join facturas on comuneros.id_comunero = facturas.id_comunero)" +
            "inner join cuotas_factura on facturas.id_factura=cuotas_factura.id_factura )inner join cuota_anual on cuotas_factura.id_cuota=cuota_anual.id_cuota)inner join anio on cuota_anual.id_anio=anio.id_anio) " +
            "where comuneros.id_comunero=" + req.body.id);
        if (cuotas[0].length > 0) {
            const cuotasCom = cuotas[0];
            res.json({ cuotasCom });
        }
        else {
            res.status(404).json({
                msg: 'El comunero no ha pagado ninguna cuota'
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
exports.obtenerCuotasComunero = obtenerCuotasComunero;
const obtenerCuotasDeudaComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //buscar si existe el comunero
        const encontrarComunero = yield init_models_1.comuneros.findByPk(req.body.id);
        //si no existe el comunero
        if (!encontrarComunero) {
            return res.status(404).json({
                msg: 'El comunero no existe'
            });
        }
        //obtener las cuotas que no ha pagado el comunero
        const cuotas = yield connection_1.default.query("select cuota_anual.id_cuota,cuota_anual.nom_cuota,cuota_anual.descripcion,cuota_anual.valor_cuota from cuota_anual where cuota_anual.id_cuota not in (select cuota_anual.id_cuota from (((((personas inner join comuneros on personas.id_persona=comuneros.id_persona) inner join facturas on comuneros.id_comunero = facturas.id_comunero) inner join cuotas_factura on facturas.id_factura=cuotas_factura.id_factura )inner join cuota_anual on cuota_anual.id_cuota= cuotas_factura.id_cuota)inner join anio on cuota_anual.id_anio=anio.id_anio) where comuneros.id_comunero=" + req.body.id + ")");
        if (cuotas[0].length > 0) {
            const cuotasCom = cuotas[0];
            res.json({ cuotasCom });
        }
        else {
            //retorbar un arreglo vacio
            const cuotasCom = cuotas[0];
            res.json({ cuotasCom });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerCuotasDeudaComunero = obtenerCuotasDeudaComunero;
//# sourceMappingURL=cuotas.js.map