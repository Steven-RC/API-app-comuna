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
exports.actualizarTipoDocumento = exports.obtenerTiposDocumentos = exports.crearTipoDocumento = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
const crearTipoDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //crear tipo documento
    const { tipoDocumento } = req.body;
    //quitar espacios y convertir a minusculas
    const alias = tipoDocumento.replace(/\s/g, '').toLowerCase();
    console.log(alias);
    const tipoDocument = {
        TIPO_DOC: tipoDocumento,
    };
    yield init_models_1.tipo_documentos.create(tipoDocument);
    res.json({
        msg: 'Tipo de documento creado'
    });
});
exports.crearTipoDocumento = crearTipoDocumento;
//obtener tipos de documentos
const obtenerTiposDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tiposDocumentos = yield init_models_1.tipo_documentos.findAll();
    res.json({
        tiposDocumentos
    });
});
exports.obtenerTiposDocumentos = obtenerTiposDocumentos;
//actualizar tipo de documento
const actualizarTipoDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { tipoDocumento } = req.body;
    const alias = tipoDocumento.replace(/\s/g, '').toLowerCase();
    yield init_models_1.tipo_documentos.update({
        TIPO_DOC: tipoDocumento,
        ALIAS: alias
    }, {
        where: {
            ID_TIPO_DOC: id
        }
    });
    res.json({
        msg: 'Tipo de documento actualizado'
    });
});
exports.actualizarTipoDocumento = actualizarTipoDocumento;
//# sourceMappingURL=tipo_documentos.js.map