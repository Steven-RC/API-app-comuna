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
exports.eliminarPersona = exports.getPersonas = exports.crearPersona = void 0;
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
//crear metodo para retornar todas las personas
const getPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPersonas = yield init_models_1.personas.findAll();
    if (listPersonas) {
        res.json({ listPersonas });
    }
    else {
        res.status(404).json({
            msg: 'No hay personas'
        });
    }
});
exports.getPersonas = getPersonas;
//crear metodo para eliminar una persona
const eliminarPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const encontrarPersona = yield init_models_1.personas.findByPk(id);
    if (!encontrarPersona) {
        return res.status(404).json({
            msg: 'Persona no encontrada'
        });
    }
    yield encontrarPersona.destroy();
    res.json({
        msg: 'Persona eliminada'
    });
});
exports.eliminarPersona = eliminarPersona;
//crear metodo para actualizar el nombre de una persona
// export const actualizarPersona = async (req: Request, res: Response) => {
//     const {nombre } = req.body;
//     const encontrarPersona = await personas.findOne({
//         where: {
//             NOMBRE: req.body.nombre
//         }
//     })
//     if (encontrarPersona) {
//         return res.status(400).json({
//             msg: 'El nombre ya existe'
//         })
//     }else{
//         const upPersona: personasCreationAttributes = {
//             NOMBRE: nombre,
//         }
//         if (!encontrarPersona) {
//             return res.status(404).json({
//                 msg: 'Persona no encontrada'
//             })
//         }
//         await encontrarPersona.update(upPersona);
//         res.json({
//             msg: 'Persona actualizada'
//         })
//     }
// }
//# sourceMappingURL=personas.js.map