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
const subirPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
                alias: tipoDoc
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
                alias: tipoDoc
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
                id_comunero: parseInt(id),
                id_tipo_doc: tipoDocumento.id_tipo_doc
            }
        });
        if (documentoComunero) {
            //borrar el documento
            const pathDocumento = path_1.default.join(__dirname, '../uploads', tipoDoc, documentoComunero.documento);
            if (fs_1.default.existsSync(pathDocumento)) {
                fs_1.default.unlinkSync(pathDocumento);
            }
            console.log(pathDocumento);
            //borrar la relacion
            yield init_models_1.comuneros_tipos_doc.destroy({
                where: {
                    id_comunero: parseInt(id),
                    id_tipo_doc: tipoDocumento.id_tipo_doc
                }
            });
        }
        //subir el documento
        const nombre = String(yield subir_archivo_1.default.subirArchivo(req.files, ['pdf'], tipoDoc));
        //crear relacion comunero_tipo_doc
        const comuneroTipoDoc = {
            id_comunero: id,
            id_tipo_doc: tipoDocumento.id_tipo_doc,
            documento: nombre,
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.subirPDF = subirPDF;
const mostrarPdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //id comunero, tipo documento, nombre del documento,
        const { tipoDoc, id } = req.params;
        let tipoDocumento;
        let documentoComunero;
        //buscar el tipo de documento
        tipoDocumento = yield init_models_1.tipo_documentos.findOne({
            where: {
                alias: tipoDoc
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
                id_comunero: id,
                id_tipo_doc: tipoDocumento.id_tipo_doc
            }
        });
        if (!documentoComunero) {
            return res.status(400).json({
                msg: `No existe un documento de tipo ${tipoDoc} para el comunero con id ${id}`
            });
        }
        //mostrar el documento
        if (documentoComunero.documento) {
            const pathDocumento = path_1.default.join(__dirname, '../uploads', tipoDoc, documentoComunero.documento);
            if (fs_1.default.existsSync(pathDocumento)) {
                return res.sendFile(pathDocumento);
            }
            else {
                return res.status(400).json({
                    msg: `No existe el documento en el servidor`
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.mostrarPdf = mostrarPdf;
//obtener comuneros tipo doc
const obtenerComunerosTipoDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaComunerosTipoDoc = yield init_models_1.comuneros_tipos_doc.findAll({
            include: [
                {
                    model: init_models_1.comuneros,
                    as: 'id_comunero_comunero',
                    attributes: ['id_comunero', 'id_persona'],
                },
                {
                    model: init_models_1.tipo_documentos,
                    as: 'id_tipo_doc_tipo_documento',
                    attributes: ['id_tipo_doc', 'tipo_doc'],
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.obtenerComunerosTipoDoc = obtenerComunerosTipoDoc;
//obtener comuneros tipo doc por id comunero
const obtenerComunerosTipoDocPorIdComunero = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.id);
        const listaComunerosTipoDoc = yield connection_1.default.query("select tipo_documentos.id_tipo_doc,tipo_documentos.tipo_doc, tipo_documentos.alias from ((comuneros inner join comuneros_tipos_doc on comuneros.id_comunero = comuneros_tipos_doc.id_comunero)inner join tipo_documentos on comuneros_tipos_doc.id_tipo_doc=tipo_documentos.id_tipo_doc) where comuneros.id_comunero=" + req.body.id);
        if (listaComunerosTipoDoc[0].length > 0) {
            const documentosComunero = listaComunerosTipoDoc[0];
            res.json({
                documentosComunero
            });
        }
        else {
            return res.status(400).json({
                msg: `El comunero no tiene documentos registrados`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.obtenerComunerosTipoDocPorIdComunero = obtenerComunerosTipoDocPorIdComunero;
//# sourceMappingURL=documentos.js.map