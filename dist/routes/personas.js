"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personas_1 = require("../controllers/personas");
const router = (0, express_1.Router)();
router.post('/crear', personas_1.crearPersona);
router.get('/obtener', personas_1.obtenerPersonas);
router.patch('/actualizar', personas_1.actualizarPersona);
router.patch('/cambiarEstado', personas_1.cambiarEstadoPersona);
router.get('/obtenerPersonasRequisitosAprobados', personas_1.obtenerPersonasRequisitosAprobados);
exports.default = router;
//# sourceMappingURL=personas.js.map