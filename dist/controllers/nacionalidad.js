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
exports.getNacionalidades = exports.crearNacionalidad = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const init_models_1 = require("../models/init-models");
(0, init_models_1.initModels)(connection_1.default);
const crearNacionalidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {nacionalidad}=req.body;
    const encontrarNacionalidad = yield init_models_1.nacionalidad.findOne({
        where: {
            NACIONALIDAD: req.body.nacionalidad
        }
    });
    if (encontrarNacionalidad) {
        return res.status(400).json({
            msg: 'La nacionalidad ya existe'
        });
    }
    else {
        const nacionalidadcr = {
            NACIONALIDAD: req.body.nacionalidad,
        };
        yield init_models_1.nacionalidad.create(nacionalidadcr);
        res.json({
            msg: 'Nacionalidad creada'
        });
    }
});
exports.crearNacionalidad = crearNacionalidad;
//crear metodo para retornar todas las nacionalidades
const getNacionalidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listNacionalidades = yield init_models_1.nacionalidad.findAll();
    if (listNacionalidades) {
        res.json({ listNacionalidades });
    }
    else {
        res.status(404).json({
            msg: 'No hay nacionalidades'
        });
    }
});
exports.getNacionalidades = getNacionalidades;
//# sourceMappingURL=nacionalidad.js.map