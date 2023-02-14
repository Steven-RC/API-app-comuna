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
exports.mostrarImagen = exports.subirImagen = exports.cargarArchivo = void 0;
const subir_archivo_1 = __importDefault(require("../helpers/subir-archivo"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const init_models_1 = require("../models/init-models");
//importar cloudinary v2
const cargarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No files were uploaded.' });
    }
    try {
        const nombre = yield subir_archivo_1.default.subirArchivo(req.files, ['pdf'], 'cedulas');
        res.json({
            nombre: nombre
        });
    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
});
exports.cargarArchivo = cargarArchivo;
const subirImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coleccion, id } = req.params;
        let modelo;
        switch (coleccion) {
            case 'usuarios':
                modelo = yield init_models_1.usuarios.findByPk(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`
                    });
                }
                break;
            default:
                return res.status(500).json({ msg: 'Se me olvido validar esto' });
        }
        //limpiar imagenes previas
        if (modelo.img) {
            //hay que borrar la imagen del servidor
            const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs_1.default.existsSync(pathImagen)) {
                fs_1.default.unlinkSync(pathImagen);
            }
        }
        const nombre = yield subir_archivo_1.default.subirArchivo(req.files, ['png', 'jpg', 'jpeg'], 'usuarios');
        modelo.img = nombre;
        yield modelo.save();
        res.json({
            modelo
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
});
exports.subirImagen = subirImagen;
const mostrarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coleccion, id } = req.params;
        let modelo;
        switch (coleccion) {
            case 'usuarios':
                modelo = yield init_models_1.usuarios.findByPk(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`
                    });
                }
                break;
            default:
                return res.status(500).json({ msg: 'Se me olvido validar esto' });
        }
        //limpiar imagenes previas
        if (modelo.img) {
            //hay que borrar la imagen del servidor
            const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs_1.default.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
            else {
                return res.sendFile(path_1.default.join(__dirname, '../assets/no-image.jpg'));
            }
        }
        res.json({
            msg: 'no existe imagen'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error inesperado' });
    }
});
exports.mostrarImagen = mostrarImagen;
//# sourceMappingURL=uploads.js.map