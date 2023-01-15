"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nacionalidad_1 = require("../controllers/nacionalidad");
const router = (0, express_1.Router)();
router.post('/crear', nacionalidad_1.crearNacionalidad);
router.get('/obtener', nacionalidad_1.getNacionalidades);
exports.default = router;
//# sourceMappingURL=nacionalidad.js.map