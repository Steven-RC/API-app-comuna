"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturas_1 = require("../controllers/facturas");
const router = (0, express_1.Router)();
router.get('/obtener', facturas_1.obtenerFacturas);
router.post('/crear', facturas_1.crearFactura);
router.post('/obtenerComunero', facturas_1.obtenerFacturasComunero);
exports.default = router;
//# sourceMappingURL=facturas.js.map