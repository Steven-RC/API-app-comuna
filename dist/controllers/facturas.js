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
exports.obtenerFacturasComunero = exports.crearFactura = exports.obtenerFacturas = void 0;
const init_models_1 = require("../models/init-models");
const connection_1 = __importDefault(require("../db/connection"));
(0, init_models_1.initModels)(connection_1.default);
const obtenerFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listFacturas = yield init_models_1.facturas.findAll();
    if (listFacturas) {
        res.json({ listFacturas });
    }
    else {
        res.status(404).json({
            msg: 'No hay facturas'
        });
    }
});
exports.obtenerFacturas = obtenerFacturas;
//crear factura
const crearFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.crearFactura = crearFactura;
//obtener facturas de un comunero
const obtenerFacturasComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.obtenerFacturasComunero = obtenerFacturasComunero;
//# sourceMappingURL=facturas.js.map