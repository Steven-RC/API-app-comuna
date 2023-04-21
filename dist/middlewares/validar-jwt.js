"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    //x-token headers
    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        // console.log(uid);
        req.uid = uid;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
};
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map