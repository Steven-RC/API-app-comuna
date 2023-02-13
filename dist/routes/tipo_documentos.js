"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipo_documentos_1 = require("../controllers/tipo_documentos");
const router = (0, express_1.Router)();
router.post('/crear', tipo_documentos_1.crearTipoDocumento);
router.get('/obtener', tipo_documentos_1.obtenerTiposDocumentos);
router.patch('/actualizar', tipo_documentos_1.actualizarTipoDocumento);
exports.default = router;
//# sourceMappingURL=tipo_documentos.js.map