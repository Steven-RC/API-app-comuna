"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comuneros_1 = require("../controllers/comuneros");
const router = (0, express_1.Router)();
router.post('/crear', comuneros_1.crearComunero);
router.get('/obtener', comuneros_1.getComuneros);
exports.default = router;
//# sourceMappingURL=comuneros.js.map