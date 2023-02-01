"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.usuarios = exports.tipo_documentos = exports.rol_user = exports.requisitos = exports.requisito_apr = exports.personas = exports.nacionalidad = exports.forma_pago = exports.facturas = exports.documentos = exports.cuotas_factura = exports.cuota_anual = exports.comuneros = exports.barrios = exports.asociaciones = exports.anio = void 0;
const anio_1 = require("./anio");
Object.defineProperty(exports, "anio", { enumerable: true, get: function () { return anio_1.anio; } });
const asociaciones_1 = require("./asociaciones");
Object.defineProperty(exports, "asociaciones", { enumerable: true, get: function () { return asociaciones_1.asociaciones; } });
const barrios_1 = require("./barrios");
Object.defineProperty(exports, "barrios", { enumerable: true, get: function () { return barrios_1.barrios; } });
const comuneros_1 = require("./comuneros");
Object.defineProperty(exports, "comuneros", { enumerable: true, get: function () { return comuneros_1.comuneros; } });
const cuota_anual_1 = require("./cuota_anual");
Object.defineProperty(exports, "cuota_anual", { enumerable: true, get: function () { return cuota_anual_1.cuota_anual; } });
const cuotas_factura_1 = require("./cuotas_factura");
Object.defineProperty(exports, "cuotas_factura", { enumerable: true, get: function () { return cuotas_factura_1.cuotas_factura; } });
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
const requisito_apr_1 = require("./requisito_apr");
Object.defineProperty(exports, "requisito_apr", { enumerable: true, get: function () { return requisito_apr_1.requisito_apr; } });
const requisitos_1 = require("./requisitos");
Object.defineProperty(exports, "requisitos", { enumerable: true, get: function () { return requisitos_1.requisitos; } });
const rol_user_1 = require("./rol_user");
Object.defineProperty(exports, "rol_user", { enumerable: true, get: function () { return rol_user_1.rol_user; } });
const tipo_documentos_1 = require("./tipo_documentos");
Object.defineProperty(exports, "tipo_documentos", { enumerable: true, get: function () { return tipo_documentos_1.tipo_documentos; } });
const usuarios_1 = require("./usuarios");
Object.defineProperty(exports, "usuarios", { enumerable: true, get: function () { return usuarios_1.usuarios; } });
function initModels(sequelize) {
    const anio = anio_1.anio.initModel(sequelize);
    const asociaciones = asociaciones_1.asociaciones.initModel(sequelize);
    const barrios = barrios_1.barrios.initModel(sequelize);
    const comuneros = comuneros_1.comuneros.initModel(sequelize);
    const cuota_anual = cuota_anual_1.cuota_anual.initModel(sequelize);
    const cuotas_factura = cuotas_factura_1.cuotas_factura.initModel(sequelize);
    const documentos = documentos_1.documentos.initModel(sequelize);
    const facturas = facturas_1.facturas.initModel(sequelize);
    const forma_pago = forma_pago_1.forma_pago.initModel(sequelize);
    const nacionalidad = nacionalidad_1.nacionalidad.initModel(sequelize);
    const personas = personas_1.personas.initModel(sequelize);
    const requisito_apr = requisito_apr_1.requisito_apr.initModel(sequelize);
    const requisitos = requisitos_1.requisitos.initModel(sequelize);
    const rol_user = rol_user_1.rol_user.initModel(sequelize);
    const tipo_documentos = tipo_documentos_1.tipo_documentos.initModel(sequelize);
    const usuarios = usuarios_1.usuarios.initModel(sequelize);
    cuota_anual.belongsToMany(facturas, { as: 'ID_FACTURA_facturas', through: cuotas_factura, foreignKey: "ID_CUOTA", otherKey: "ID_FACTURA" });
    facturas.belongsToMany(cuota_anual, { as: 'ID_CUOTA_cuota_anuals', through: cuotas_factura, foreignKey: "ID_FACTURA", otherKey: "ID_CUOTA" });
    cuota_anual.belongsTo(anio, { as: "ID_ANIO_anio", foreignKey: "ID_ANIO" });
    anio.hasMany(cuota_anual, { as: "cuota_anuals", foreignKey: "ID_ANIO" });
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
    cuotas_factura.belongsTo(cuota_anual, { as: "ID_CUOTA_cuota_anual", foreignKey: "ID_CUOTA" });
    cuota_anual.hasMany(cuotas_factura, { as: "cuotas_facturas", foreignKey: "ID_CUOTA" });
    cuotas_factura.belongsTo(facturas, { as: "ID_FACTURA_factura", foreignKey: "ID_FACTURA" });
    facturas.hasMany(cuotas_factura, { as: "cuotas_facturas", foreignKey: "ID_FACTURA" });
    facturas.belongsTo(forma_pago, { as: "ID_FORMA_PAGO_forma_pago", foreignKey: "ID_FORMA_PAGO" });
    forma_pago.hasMany(facturas, { as: "facturas", foreignKey: "ID_FORMA_PAGO" });
    personas.belongsTo(nacionalidad, { as: "ID_NACIONALIDAD_nacionalidad", foreignKey: "ID_NACIONALIDAD" });
    nacionalidad.hasMany(personas, { as: "personas", foreignKey: "ID_NACIONALIDAD" });
    comuneros.belongsTo(personas, { as: "ID_PERSONA_persona", foreignKey: "ID_PERSONA" });
    personas.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_PERSONA" });
    requisito_apr.belongsTo(personas, { as: "ID_PERSONA_persona", foreignKey: "ID_PERSONA" });
    personas.hasMany(requisito_apr, { as: "requisito_aprs", foreignKey: "ID_PERSONA" });
    requisito_apr.belongsTo(requisitos, { as: "ID_REQ_requisito", foreignKey: "ID_REQ" });
    requisitos.hasMany(requisito_apr, { as: "requisito_aprs", foreignKey: "ID_REQ" });
    usuarios.belongsTo(rol_user, { as: "ID_ROL_rol_user", foreignKey: "ID_ROL" });
    rol_user.hasMany(usuarios, { as: "usuarios", foreignKey: "ID_ROL" });
    documentos.belongsTo(tipo_documentos, { as: "ID_TIPO_DOC_tipo_documento", foreignKey: "ID_TIPO_DOC" });
    tipo_documentos.hasOne(documentos, { as: "documento", foreignKey: "ID_TIPO_DOC" });
    return {
        anio: anio,
        asociaciones: asociaciones,
        barrios: barrios,
        comuneros: comuneros,
        cuota_anual: cuota_anual,
        cuotas_factura: cuotas_factura,
        documentos: documentos,
        facturas: facturas,
        forma_pago: forma_pago,
        nacionalidad: nacionalidad,
        personas: personas,
        requisito_apr: requisito_apr,
        requisitos: requisitos,
        rol_user: rol_user,
        tipo_documentos: tipo_documentos,
        usuarios: usuarios,
    };
}
exports.initModels = initModels;
//# sourceMappingURL=init-models.js.map