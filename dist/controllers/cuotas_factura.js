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
exports.obtenerCuotasFactura = exports.crearCuotaFactura = void 0;
const init_models_1 = require("../models/init-models");
const connection_1 = __importDefault(require("../db/connection"));
(0, init_models_1.initModels)(connection_1.default);
const crearCuotaFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_cuota, id_factura } = req.body;
        const cuotaFactura = {
            ID_CUOTA: id_cuota,
            ID_FACTURA: id_factura
        };
        yield init_models_1.cuotas_factura.create(cuotaFactura);
        res.json({
            msg: 'Cuota de factura creada '
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.crearCuotaFactura = crearCuotaFactura;
//obtener cuotas de una factura
const obtenerCuotasFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_factura = req.body.id_factura;
        const listCuotas = yield init_models_1.cuotas_factura.findAll({
            where: {
                ID_FACTURA: id_factura
            }, include: [{
                    model: init_models_1.cuota_anual,
                    as: 'ID_CUOTA_cuota_anual',
                    attributes: ['NOM_CUOTA', 'DESCRIPCION', 'VALOR_CUOTA']
                }]
        });
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
exports.obtenerCuotasFactura = obtenerCuotasFactura;
//# sourceMappingURL=cuotas_factura.js.map