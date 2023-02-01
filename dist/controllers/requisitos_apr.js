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
(0, init_models_1.initModels)(connection_1.default);
//aprobar requisito
const aprobarRequisito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fechaApr = new Date().toString();
    const { id_requisito, id_persona, observacion } = req.body;
    //buscar persona    
    const reqApr = {
        ID_REQ: id_requisito,
        ID_PERSONA: id_persona,
        OBSERVACION: observacion,
        FECHA_AP: fechaApr
    };
    yield init_models_1.requisito_apr.create(reqApr);
    res.json({
        msg: 'Requisito aprobado con exito'
    });
});
exports.aprobarRequisito = aprobarRequisito;
//obtener todos los requisitos  y observaciones
const obtenerRequisitosApr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRequisitosApr = yield init_models_1.requisito_apr.findAll({
        attributes: ['ID_REQ', 'ID_PERSONA']
    });
    res.json({
        listRequisitosApr
    });
});
exports.obtenerRequisitosApr = obtenerRequisitosApr;
//obtener personas con requisitos aprobados
const obtenerPersonasApr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqApr = yield init_models_1.requisito_apr.findAll({
        attributes: ['ID_PERSONA'],
        include: {
            model: requisitos_1.requisitos,
            as: 'ID_REQ_requisito',
            attributes: ['ID_REQ', 'REQUISITO',],
        },
    });
    res.json({
        reqApr
    });
});
exports.obtenerPersonasApr = obtenerPersonasApr;
//# sourceMappingURL=requisitos_apr.js.map