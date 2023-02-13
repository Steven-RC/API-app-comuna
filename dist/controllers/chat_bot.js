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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarDocumento = exports.obtenerInfoOCR = exports.chatBot = void 0;
const python_shell_1 = require("python-shell");
const chatBot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        scriptPath: './chat-bot',
        args: [req.body.message]
    };
    console.log(req.body.message);
    try {
        yield python_shell_1.PythonShell.run('main.py', options, function (err, results) {
            if (err)
                throw err;
            console.log('results: %j', results);
            res.json({
                ok: true,
                message: results
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }
});
exports.chatBot = chatBot;
const obtenerInfoOCR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // si no hay texto en el body
    if (!req.body.text) {
        return res.status(400).json({
            ok: false,
            message: 'No se recibió texto'
        });
    }
    else {
        const options = {
            scriptPath: './chat-bot',
            args: [req.body.text]
        };
        console.log(req.body.text);
        try {
            python_shell_1.PythonShell.run('search.py', options, function (err, results) {
                if (err)
                    throw err;
                console.log('results: %j', results);
                res.json(results);
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Error inesperado'
            });
        }
    }
});
exports.obtenerInfoOCR = obtenerInfoOCR;
const buscarDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // si no hay texto en el body
    if (!req.body.text) {
        return res.status(400).json({
            ok: false,
            message: 'No se recibió texto'
        });
    }
    else {
        const options = {
            scriptPath: './chat-bot',
            args: [req.body.text]
        };
        console.log(req.body.text);
        try {
            python_shell_1.PythonShell.run('buscar_documento.py', options, function (err, results) {
                if (err)
                    throw err;
                console.log('results: %j', results);
                res.json(results);
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Error inesperado'
            });
        }
    }
});
exports.buscarDocumento = buscarDocumento;
//# sourceMappingURL=chat_bot.js.map