"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
const nodemailer_1 = __importDefault(require("nodemailer"));
(0, init_models_1.initModels)(connection_1.default);
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //obtener mail del usuario
    const { email } = req.body;
    // buscar el email en los usuarios
    const busUser = yield init_models_1.usuarios.findOne({
        where: {
            EMAIL: email
        },
        attributes: [
            'EMAIL',
        ]
    });
    // si no existe el email
    if (!busUser) {
        return res.status(404).json({
            msg: 'Email no encontrado'
        });
    }
    // si existe el email enviar email con link para resetear contraseña con token
    else {
        //crear objeto con el email del usuario
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'stevenrosales31@gmail.com',
                pass: 'uihwfnjofqdiymii'
            }
        });
        const mailOptions = {
            from: 'stevenrosales31@gmail.com',
            to: email,
            subject: 'Resetear contraseña',
            text: 'Para resetear su contraseña haga click en el siguiente link: http://localhost:5173/?#/updatepassword'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json({
            msg: 'Email enviado'
        });
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=ressetPassword.js.map