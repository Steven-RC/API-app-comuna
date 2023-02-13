"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_1 = require("../controllers/uploads");
const valiadar_archivo_1 = require("../middlewares/valiadar-archivo");
const router = (0, express_1.Router)();
router.post('/', valiadar_archivo_1.validarArchivoSubir, uploads_1.cargarArchivo);
router.put('/:coleccion/:id', valiadar_archivo_1.validarArchivoSubir, uploads_1.subirImagen);
router.get('/:coleccion/:id', uploads_1.mostrarImagen);
exports.default = router;
//# sourceMappingURL=uploads.js.map