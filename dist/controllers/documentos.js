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
exports.obtenerComunerosTipoDocPorIdComunero = exports.obtenerComunerosTipoDoc = exports.mostrarPdf = exports.subirPDF = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const subir_archivo_1 = __importDefault(require("../helpers/subir-archivo"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const init_models_1 = require("../models/init-models");
//importar cloudinary v2
(0, init_models_1.initModels)(connection_1.default);
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
});
const subirPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos que subir' });
    }
    const { tipoDoc, id } = req.params;
    let tipoDocumento;
    let documentoComunero;
    //buscar el tipo de documento
    tipoDocumento = yield init_models_1.tipo_documentos.findOne({
        where: {
            ALIAS: tipoDoc
        }
    });
    if (!tipoDocumento) {
        return res.status(400).json({
            msg: `No existe un tipo de documento con el nombre ${tipoDoc}`
        });
    }
    //buscar si existe el tipo de documento
    tipoDocumento = yield init_models_1.tipo_documentos.findOne({
        where: {
            ALIAS: tipoDoc
        }
    });
    if (!tipoDocumento) {
        return res.status(400).json({
            msg: `No existe un tipo de documento con el nombre ${tipoDoc}`
        });
    }
    //si ya existe un documento de ese tipo, borrarlo
    documentoComunero = yield init_models_1.comuneros_tipos_doc.findOne({
        where: {
            ID_COMUNERO: parseInt(id),
            ID_TIPO_DOC: tipoDocumento.ID_TIPO_DOC
        }
    });
    if (documentoComunero) {
        //borrar el documento
        const pathDocumento = path_1.default.join(__dirname, '../uploads', tipoDoc, documentoComunero.DOCUMENTO);
        if (fs_1.default.existsSync(pathDocumento)) {
            fs_1.default.unlinkSync(pathDocumento);
        }
        console.log(pathDocumento);
        //borrar la relacion
        yield init_models_1.comuneros_tipos_doc.destroy({
            where: {
                ID_COMUNERO: parseInt(id),
                ID_TIPO_DOC: tipoDocumento.ID_TIPO_DOC
            }
        });
    }
    //subir el documento
    const nombre = String(yield subir_archivo_1.default.subirArchivo(req.files, ['pdf'], tipoDoc));
    //crear relacion comunero_tipo_doc
    const comuneroTipoDoc = {
        ID_COMUNERO: parseInt(id),
        ID_TIPO_DOC: tipoDocumento.ID_TIPO_DOC,
        DOCUMENTO: nombre,
    };
    try {
        yield init_models_1.comuneros_tipos_doc.create(comuneroTipoDoc);
    }
    catch (err) {
        return res.status(400).json({
            msg: err
        });
    }
    res.json({
        nombre: nombre
    });
});
exports.subirPDF = subirPDF;
const mostrarPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //id comunero, tipo documento, nombre del documento,
    const { tipoDoc, id } = req.params;
    let tipoDocumento;
    let documentoComunero;
    //buscar el tipo de documento
    tipoDocumento = yield init_models_1.tipo_documentos.findOne({
        where: {
            ALIAS: tipoDoc
        }
    });
    if (!tipoDocumento) {
        return res.status(400).json({
            msg: `No existe un tipo de documento con el nombre ${tipoDoc}`
        });
    }
    //buscar el comunero
    documentoComunero = yield init_models_1.comuneros_tipos_doc.findOne({
        where: {
            ID_COMUNERO: parseInt(id),
            ID_TIPO_DOC: tipoDocumento.ID_TIPO_DOC
        }
    });
    if (!documentoComunero) {
        return res.status(400).json({
            msg: `No existe un documento de tipo ${tipoDoc} para el comunero con id ${id}`
        });
    }
    //mostrar el documento
    if (documentoComunero.DOCUMENTO) {
        const pathDocumento = path_1.default.join(__dirname, '../uploads', tipoDoc, documentoComunero.DOCUMENTO);
        if (fs_1.default.existsSync(pathDocumento)) {
            return res.sendFile(pathDocumento);
        }
        else {
            return res.status(400).json({
                msg: `No existe el documento en el servidor`
            });
        }
    }
});
exports.mostrarPdf = mostrarPdf;
//obtener comuneros tipo doc
const obtenerComunerosTipoDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaComunerosTipoDoc = yield init_models_1.comuneros_tipos_doc.findAll({
        include: [
            {
                model: init_models_1.comuneros,
                as: 'ID_COMUNERO_comunero',
                attributes: ['ID_COMUNERO', 'ID_PERSONA'],
            },
            {
                model: init_models_1.tipo_documentos,
                as: 'ID_TIPO_DOC_tipo_documento',
                attributes: ['ID_TIPO_DOC', 'TIPO_DOC'],
            }
        ]
    });
    if (!listaComunerosTipoDoc) {
        return res.status(400).json({
            msg: `No existen documentos de comuneros`
        });
    }
    res.json({
        listaComunerosTipoDoc
    });
});
exports.obtenerComunerosTipoDoc = obtenerComunerosTipoDoc;
//obtener comuneros tipo doc por id comunero
const obtenerComunerosTipoDocPorIdComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.id);
    const listaComunerosTipoDoc = yield connection_1.default.query("select tipo_documentos.ID_TIPO_DOC,tipo_documentos.TIPO_DOC, tipo_documentos.ALIAS from ((comuneros inner join comuneros_tipos_doc on comuneros.ID_COMUNERO = comuneros_tipos_doc.ID_COMUNERO)inner join tipo_documentos on comuneros_tipos_doc.ID_TIPO_DOC=tipo_documentos.ID_TIPO_DOC) where comuneros.ID_COMUNERO=" + req.body.id);
    if (listaComunerosTipoDoc[0].length > 0) {
        const listaComuneros = listaComunerosTipoDoc[0];
        res.json({
            listaComuneros
        });
    }
    else {
        return res.status(400).json({
            msg: `El comunero no tiene documentos registrados`
        });
    }
});
exports.obtenerComunerosTipoDocPorIdComunero = obtenerComunerosTipoDocPorIdComunero;
//# sourceMappingURL=documentos.js.map