"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuotas_factura_1 = require("../controllers/cuotas_factura");
const router = (0, express_1.Router)();
router.post('/crear', cuotas_factura_1.crearCuotaFactura);
router.post('/obtener', cuotas_factura_1.obtenerCuotasFactura);
exports.default = router;
//# sourceMappingURL=cuotas_factura.js.map