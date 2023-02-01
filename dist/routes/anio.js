"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const anio_1 = require("../controllers/anio");
const router = (0, express_1.Router)();
router.post('/crear', anio_1.crearAnio);
exports.default = router;
//# sourceMappingURL=anio.js.map