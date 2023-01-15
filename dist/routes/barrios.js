"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const barrios_1 = require("../controllers/barrios");
const router = (0, express_1.Router)();
router.post('/crear', barrios_1.crearBarrio);
router.get('/obtener', barrios_1.obtenerBarrios);
exports.default = router;
//# sourceMappingURL=barrios.js.map