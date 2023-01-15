"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.usuarios = exports.tipo_documentos = exports.rol_user = exports.personas = exports.nacionalidad = exports.forma_pago = exports.facturas = exports.documentos = exports.cuota_anual = exports.comuneros = exports.barrios = exports.asociaciones = void 0;
const asociaciones_1 = require("./asociaciones");
Object.defineProperty(exports, "asociaciones", { enumerable: true, get: function () { return asociaciones_1.asociaciones; } });
const barrios_1 = require("./barrios");
Object.defineProperty(exports, "barrios", { enumerable: true, get: function () { return barrios_1.barrios; } });
const comuneros_1 = require("./comuneros");
Object.defineProperty(exports, "comuneros", { enumerable: true, get: function () { return comuneros_1.comuneros; } });
const cuota_anual_1 = require("./cuota_anual");
Object.defineProperty(exports, "cuota_anual", { enumerable: true, get: function () { return cuota_anual_1.cuota_anual; } });
const documentos_1 = require("./documentos");
Object.defineProperty(exports, "documentos", { enumerable: true, get: function () { return documentos_1.documentos; } });
const facturas_1 = require("./facturas");
Object.defineProperty(exports, "facturas", { enumerable: true, get: function () { return facturas_1.facturas; } });
const forma_pago_1 = require("./forma_pago");
Object.defineProperty(exports, "forma_pago", { enumerable: true, get: function () { return forma_pago_1.forma_pago; } });
const nacionalidad_1 = require("./nacionalidad");
Object.defineProperty(exports, "nacionalidad", { enumerable: true, get: function () { return nacionalidad_1.nacionalidad; } });
const personas_1 = require("./personas");
Object.defineProperty(exports, "personas", { enumerable: true, get: function () { return personas_1.personas; } });
const rol_user_1 = require("./rol_user");
Object.defineProperty(exports, "rol_user", { enumerable: true, get: function () { return rol_user_1.rol_user; } });
const tipo_documentos_1 = require("./tipo_documentos");
Object.defineProperty(exports, "tipo_documentos", { enumerable: true, get: function () { return tipo_documentos_1.tipo_documentos; } });
const usuarios_1 = require("./usuarios");
Object.defineProperty(exports, "usuarios", { enumerable: true, get: function () { return usuarios_1.usuarios; } });
function initModels(sequelize) {
    const asociaciones = asociaciones_1.asociaciones.initModel(sequelize);
    const barrios = barrios_1.barrios.initModel(sequelize);
    const comuneros = comuneros_1.comuneros.initModel(sequelize);
    const cuota_anual = cuota_anual_1.cuota_anual.initModel(sequelize);
    const documentos = documentos_1.documentos.initModel(sequelize);
    const facturas = facturas_1.facturas.initModel(sequelize);
    const forma_pago = forma_pago_1.forma_pago.initModel(sequelize);
    const nacionalidad = nacionalidad_1.nacionalidad.initModel(sequelize);
    const personas = personas_1.personas.initModel(sequelize);
    const rol_user = rol_user_1.rol_user.initModel(sequelize);
    const tipo_documentos = tipo_documentos_1.tipo_documentos.initModel(sequelize);
    const usuarios = usuarios_1.usuarios.initModel(sequelize);
    comuneros.belongsTo(asociaciones, { as: "ID_ASO_asociacione", foreignKey: "ID_ASO" });
    asociaciones.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_ASO" });
    comuneros.belongsTo(barrios, { as: "ID_BARRIO_barrio", foreignKey: "ID_BARRIO" });
    barrios.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_BARRIO" });
    documentos.belongsTo(comuneros, { as: "ID_COMUNERO_comunero", foreignKey: "ID_COMUNERO" });
    comuneros.hasMany(documentos, { as: "documentos", foreignKey: "ID_COMUNERO" });
    facturas.belongsTo(comuneros, { as: "ID_COMUNERO_comunero", foreignKey: "ID_COMUNERO" });
    comuneros.hasMany(facturas, { as: "facturas", foreignKey: "ID_COMUNERO" });
    usuarios.belongsTo(comuneros, { as: "ID_COMUNERO_comunero", foreignKey: "ID_COMUNERO" });
    comuneros.hasMany(usuarios, { as: "usuarios", foreignKey: "ID_COMUNERO" });
    comuneros.belongsTo(cuota_anual, { as: "ID_CUOTA_cuota_anual", foreignKey: "ID_CUOTA" });
    cuota_anual.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_CUOTA" });
    forma_pago.belongsTo(facturas, { as: "ID_FACTURA_factura", foreignKey: "ID_FACTURA" });
    facturas.hasMany(forma_pago, { as: "forma_pagos", foreignKey: "ID_FACTURA" });
    personas.belongsTo(nacionalidad, { as: "ID_NACIONALIDAD_nacionalidad", foreignKey: "ID_NACIONALIDAD" });
    nacionalidad.hasMany(personas, { as: "personas", foreignKey: "ID_NACIONALIDAD" });
    comuneros.belongsTo(personas, { as: "ID_PERSONA_persona", foreignKey: "ID_PERSONA" });
    personas.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_PERSONA" });
    usuarios.belongsTo(rol_user, { as: "ID_ROL_rol_user", foreignKey: "ID_ROL" });
    rol_user.hasMany(usuarios, { as: "usuarios", foreignKey: "ID_ROL" });
    documentos.belongsTo(tipo_documentos, { as: "ID_TIPO_DOC_tipo_documento", foreignKey: "ID_TIPO_DOC" });
    tipo_documentos.hasOne(documentos, { as: "documento", foreignKey: "ID_TIPO_DOC" });
    return {
        asociaciones: asociaciones,
        barrios: barrios,
        comuneros: comuneros,
        cuota_anual: cuota_anual,
        documentos: documentos,
        facturas: facturas,
        forma_pago: forma_pago,
        nacionalidad: nacionalidad,
        personas: personas,
        rol_user: rol_user,
        tipo_documentos: tipo_documentos,
        usuarios: usuarios,
    };
}
exports.initModels = initModels;
//# sourceMappingURL=init-models.js.map