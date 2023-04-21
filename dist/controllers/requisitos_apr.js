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
exports.obtenerPersonasApr = exports.obtenerRequisitosApr = exports.aprobarRequisito = void 0;
const init_models_1 = require("../models/init-models");
const requisitos_1 = require("../models/requisitos");
const connection_1 = __importDefault(require("../db/connection"));
const uuid_1 = require("uuid");
(0, init_models_1.initModels)(connection_1.default);
//aprobar requisito
const aprobarRequisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fechaApr = new Date().toString();
        const { id_requisito, id_persona, observacion } = req.body;
        //buscar persona    
        const reqApr = {
            id_req_ap: (0, uuid_1.v4)(),
            id_req: id_requisito,
            id_persona: id_persona,
            observacion: observacion,
            fecha_ap: fechaApr
        };
        yield init_models_1.requisito_apr.create(reqApr);
        res.json({
            msg: 'Requisito aprobado con exito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.aprobarRequisito = aprobarRequisito;
//obtener todos los requisitos  y observaciones
const obtenerRequisitosApr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listRequisitosApr = yield init_models_1.requisito_apr.findAll({
            attributes: ['id_req', 'id_persona']
        });
        res.json({
            listRequisitosApr
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerRequisitosApr = obtenerRequisitosApr;
//obtener personas con requisitos aprobados
const obtenerPersonasApr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqApr = yield init_models_1.requisito_apr.findAll({
            attributes: ['id_persona'],
            include: {
                model: requisitos_1.requisitos,
                as: 'id_req_requisito',
                attributes: ['id_req', 'requisito',],
            },
        });
        res.json({
            reqApr
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
});
exports.obtenerPersonasApr = obtenerPersonasApr;
//# sourceMappingURL=requisitos_apr.js.map