"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_1 = require("../controllers/usuarios");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/obtener', usuarios_1.obtenerUsuario);
router.post('/crear', usuarios_1.crearUsuario);
router.post('/reset', usuarios_1.actualizarContrasena);
router.post('/deshabilitar', usuarios_1.cambiarEstado);
exports.default = router;
//# sourceMappingURL=usuarios.js.map