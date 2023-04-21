"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const terrenos_1 = require("../controllers/terrenos");
const router = (0, express_1.Router)();
router.post('/obtenerTerrenosComunero', terrenos_1.obtenerTerrenosComunero);
exports.default = router;
//# sourceMappingURL=terrenos.js.map