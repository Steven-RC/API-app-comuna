"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const subirArchivo = (files, extensionesValidas = ['jpg', 'png', 'jpeg'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        console.log(nombreCortado);
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
        // Validar extensión
        if (!extensionesValidas.includes(extensionArchivo)) {
            return reject(`La extensión ${extensionArchivo} no es permitida`);
        }
        // res.json({extensionArchivo})
        // Generar el nombre del archivo
        const nombreTemp = (0, uuid_1.v4)() + '.' + extensionArchivo;
        const uploadPath = path_1.default.join(__dirname, '../uploads/', carpeta, nombreTemp);
        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }
            resolve(nombreTemp);
        });
    });
};
exports.default = {
    subirArchivo
};
//# sourceMappingURL=subir-archivo.js.map