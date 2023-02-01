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
exports.crearDocumento = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
const crearDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documento = {
        ID_COMUNERO: req.body.id_comunero,
        ID_TIPO_DOC: req.body.id_tipo_doc,
        FILE: req.body.file
    };
    yield init_models_1.documentos.create(documento);
    res.json({
        msg: 'Documento creado'
    });
});
exports.crearDocumento = crearDocumento;
//# sourceMappingURL=documentos.js.map