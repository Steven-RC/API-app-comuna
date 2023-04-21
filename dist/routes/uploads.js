"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_1 = require("../controllers/uploads");
const valiadar_archivo_1 = require("../middlewares/valiadar-archivo");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
router.post('/', valiadar_archivo_1.validarArchivoSubir, uploads_1.cargarArchivo);
router.put('/:coleccion/:id', valiadar_archivo_1.validarArchivoSubir, uploads_1.subirImagen);
router.get('/:coleccion/:id', validar_jwt_1.default, uploads_1.mostrarImagen);
exports.default = router;
//# sourceMappingURL=uploads.js.map