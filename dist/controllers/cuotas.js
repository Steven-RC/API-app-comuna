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
(0, init_models_1.initModels)(connection_1.default);
const crearCuotaAnio = (nombre, valor, descripcion, anio, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cuota = {
            NOM_CUOTA: nombre,
            VALOR_CUOTA: valor,
            DESCRIPCION: descripcion,
            ID_ANIO: anio
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
        const anioActual = new Date().getFullYear();
        //buscar si existe un año con el año actual
        const encontrarAnio = yield init_models_1.anio.findOne({
            where: {
                ANIO: anioActual
            }
        });
        //si no existe el año actual
        if (!encontrarAnio) {
            //crear el año actual
            const anioNuevo = {
                ANIO: anioActual
            };
            yield init_models_1.anio.create(anioNuevo);
            //se vuelve a buscar el año actual
            const encontrarAnio = yield init_models_1.anio.findOne({
                where: {
                    ANIO: anioActual
                }
            });
            //se crea la cuota
            if (encontrarAnio) {
                const id_anio = encontrarAnio.ID_ANIO;
                crearCuotaAnio(req.body.nombre, req.body.valor, req.body.descripcion, id_anio, res);
            }
        }
        else {
            const id_anio = encontrarAnio.ID_ANIO;
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
            NOM_CUOTA: nombre,
            DESCRIPCION: descripcion,
            VALOR_CUOTA: valor
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
        const cuotas = yield connection_1.default.query("select cuota_anual.ID_CUOTA,cuota_anual.NOM_CUOTA,cuota_anual.DESCRIPCION,cuota_anual.VALOR_CUOTA,anio.ANIO as 'AÑO' from (((((personas inner join comuneros on personas.ID_PERSONA=comuneros.ID_PERSONA)" +
            " inner join facturas on comuneros.ID_COMUNERO = facturas.ID_COMUNERO)" +
            "inner join cuotas_factura on facturas.ID_FACTURA=cuotas_factura.ID_FACTURA )inner join cuota_anual on cuotas_factura.ID_CUOTA=cuota_anual.ID_CUOTA)inner join anio on cuota_anual.ID_ANIO=anio.ID_ANIO) " +
            "where comuneros.ID_COMUNERO=" + req.body.id);
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
        const cuotas = yield connection_1.default.query("select cuota_anual.ID_CUOTA,cuota_anual.NOM_CUOTA,cuota_anual.DESCRIPCION,cuota_anual.VALOR_CUOTA from cuota_anual where cuota_anual.ID_CUOTA not in (select cuota_anual.ID_CUOTA from (((((personas inner join comuneros on personas.ID_PERSONA=comuneros.ID_PERSONA) inner join facturas on comuneros.ID_COMUNERO = facturas.ID_COMUNERO) inner join cuotas_factura on facturas.ID_FACTURA=cuotas_factura.ID_FACTURA )inner join cuota_anual on cuota_anual.ID_CUOTA= cuotas_factura.ID_CUOTA)inner join anio on cuota_anual.ID_ANIO=anio.ID_ANIO) where comuneros.ID_COMUNERO=" + req.body.id + ")");
        if (cuotas[0].length > 0) {
            const cuotasCom = cuotas[0];
            res.json({ cuotasCom });
        }
        else {
            res.status(404).json({
                msg: 'No tiene deudas pendientes.'
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
exports.obtenerCuotasDeudaComunero = obtenerCuotasDeudaComunero;
//# sourceMappingURL=cuotas.js.map