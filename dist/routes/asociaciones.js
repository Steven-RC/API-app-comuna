"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asociaciones_1 = require("../controllers/asociaciones");
const router = (0, express_1.Router)();
router.post('/crear', asociaciones_1.crearAsociacion);
router.get('/obtener', asociaciones_1.obtenerAsociaciones);
router.patch('/actualizar', asociaciones_1.actualizarAsociacion);
exports.default = router;
//# sourceMappingURL=asociaciones.js.map