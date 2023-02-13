"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const barrios_1 = require("../controllers/barrios");
const router = (0, express_1.Router)();
router.post('/crear', barrios_1.crearBarrio);
router.get('/obtener', barrios_1.obtenerBarrios);
router.delete('/eliminar/:id', barrios_1.eliminarBarrio);
router.put('/actualizar', barrios_1.actualizarBarrio);
router.post('/comuneros', barrios_1.obtenerComunerosBarrio);
exports.default = router;
//# sourceMappingURL=barrios.js.map