"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentos_1 = require("../controllers/documentos");
const router = (0, express_1.Router)();
router.get('/:coleccion/:tipoDoc/:id', documentos_1.mostrarPdf);
router.put('/:coleccion/:tipoDoc/:id', documentos_1.subirPDF);
router.get('/obtener', documentos_1.obtenerComunerosTipoDoc);
router.post('/obtenerCom', documentos_1.obtenerComunerosTipoDocPorIdComunero);
exports.default = router;
//# sourceMappingURL=documentos.js.map