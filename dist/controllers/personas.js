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
exports.crearPersona = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
const crearPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persona = {
        CEDULA: req.body.cedula,
        APELLIDOS: req.body.apellidos,
        NOMBRE: req.body.nombre,
        FECHA_DE_NACIMIENTO: req.body.fecha_nacimiento,
        GENERO: req.body.genero,
        CELULAR_PER: req.body.celular,
        ID_NACIONALIDAD: req.body.nacionalidad,
    };
    yield init_models_1.personas.create(persona);
    res.json({
        msg: 'Persona creada'
    });
});
exports.crearPersona = crearPersona;
//# sourceMappingURL=personas.js.map