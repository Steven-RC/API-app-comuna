"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_1 = require("../controllers/usuarios");
const express_1 = require("express");
const usuarios_2 = require("../controllers/usuarios");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
router.post('/obtener', usuarios_1.obtenerUsuario);
router.post('/crear', usuarios_1.createUsuario);
router.post('/reset', usuarios_1.actualizarContrasena);
router.post('/deshabilitar', usuarios_1.cambiarEstado);
router.get('/obtenerPerRoles', usuarios_1.obtenerPerRoles);
router.get('/obtenerUsuarios', usuarios_1.obtenerUsuarios);
router.patch('/actualizarUsuario', usuarios_1.actualizarUsuario);
router.post('/resetearContrasena', usuarios_1.resetearContrasena);
router.post('/getUserById', usuarios_1.getUserById);
router.patch('/updateimg', validar_jwt_1.default, usuarios_2.updateImageUser);
exports.default = router;
//# sourceMappingURL=usuarios.js.map