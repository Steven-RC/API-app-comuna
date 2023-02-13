"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuotas_1 = require("../controllers/cuotas");
const router = (0, express_1.Router)();
router.post('/crear', cuotas_1.crearCuota);
router.get('/obtener', cuotas_1.obtenerCuotas);
router.patch('/actualizar', cuotas_1.actualizarCuota);
router.post('/obtenerComunero', cuotas_1.obtenerCuotasComunero);
router.post('/obtenerDeudaComunero', cuotas_1.obtenerCuotasDeudaComunero);
exports.default = router;
//# sourceMappingURL=cuotas.js.map