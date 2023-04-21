"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
router.post('/login', auth_1.login);
//ruta para obtener la informacion del usuario por el token
router.get('/user', validar_jwt_1.default, auth_1.getUsuario);
exports.default = router;
//# sourceMappingURL=auth.js.map