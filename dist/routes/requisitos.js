"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requisitos_1 = require("../controllers/requisitos");
const router = (0, express_1.Router)();
router.post('/crear', requisitos_1.crearRequisito);
router.get('/obtener', requisitos_1.obtenerRequisitos);
router.post('/obtenerPersona', requisitos_1.obtenerRequisitoPersona);
exports.default = router;
//# sourceMappingURL=requisitos.js.map