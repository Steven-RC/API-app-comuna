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
exports.obtenerFacturasMes = exports.obtenerFacturasComunero = exports.crearFactura = exports.obtenerFacturas = void 0;
const init_models_1 = require("../models/init-models");
const connection_1 = __importDefault(require("../db/connection"));
(0, init_models_1.initModels)(connection_1.default);
const obtenerFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listFacturas = yield init_models_1.facturas.findAll();
        if (listFacturas) {
            res.json({ listFacturas });
        }
        else {
            res.status(404).json({
                msg: 'No hay facturas'
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
exports.obtenerFacturas = obtenerFacturas;
//crear factura
const crearFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //obtener fecha actual
        const fechaActual = new Date();
        const factura = {
            ID_COMUNERO: req.body.id_comunero,
            FECHA: fechaActual.toDateString(),
            HORA: fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":" + fechaActual.getSeconds(),
            DESCRIP_FAC: req.body.descrip_fac,
            SUBTOTAL_FAC: req.body.subtotal_fac,
            TOTAL_FAC: req.body.total_fac,
        };
        yield init_models_1.facturas.create(factura);
        res.json({
            msg: 'Factura creada'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.crearFactura = crearFactura;
//obtener facturas de un comunero
const obtenerFacturasComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_comunero = req.body.id_comunero;
        const listFacturas = yield init_models_1.facturas.findAll({
            where: {
                ID_COMUNERO: id_comunero
            }
        });
        if (listFacturas) {
            res.json({ listFacturas });
        }
        else {
            res.status(404).json({
                msg: 'No hay facturas'
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
exports.obtenerFacturasComunero = obtenerFacturasComunero;
//obtener facturas por mes 
const obtenerFacturasMes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connection_1.default.query('SET lc_time_names = "es_ES"');
        const facMes = yield connection_1.default.query("SELECT DATE_FORMAT(facturas.FECHA, '%M')AS mes, MONTH(facturas.FECHA) AS mes_numero, COUNT(*) AS facturas_pagadas FROM facturas WHERE year(facturas.FECHA) GROUP BY mes, mes_numero ORDER BY mes_numero asc;");
        if (facMes) {
            res.json({ facMes });
        }
        else {
            res.status(404).json({
                msg: 'No hay facturas'
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
exports.obtenerFacturasMes = obtenerFacturasMes;
//# sourceMappingURL=facturas.js.map