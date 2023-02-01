"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requisitos_apr_1 = require("../controllers/requisitos_apr");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/aprobar', requisitos_apr_1.aprobarRequisito);
router.get('/obtener', requisitos_apr_1.obtenerRequisitosApr);
router.get('/obtenerPersonas', requisitos_apr_1.obtenerPersonasApr);
exports.default = router;
//# sourceMappingURL=requisitos_apr.js.map