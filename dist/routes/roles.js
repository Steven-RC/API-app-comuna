"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_1 = require("../controllers/roles");
const router = (0, express_1.Router)();
router.post('/crear', roles_1.crearRol);
router.get('/obtener', roles_1.obtenerRoles);
router.patch('/actualizar', roles_1.actualizarRol);
exports.default = router;
//# sourceMappingURL=roles.js.map