"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.usuarios = exports.tipo_documentos = exports.terrenos = exports.rol_user = exports.requisitos = exports.requisito_apr = exports.personas = exports.nacionalidad = exports.forma_pago = exports.facturas = exports.cuotas_factura = exports.cuota_anual = exports.comuneros_tipos_doc = exports.comuneros = exports.barrios = exports.asociaciones = exports.anio = void 0;
const anio_1 = require("./anio");
Object.defineProperty(exports, "anio", { enumerable: true, get: function () { return anio_1.anio; } });
const asociaciones_1 = require("./asociaciones");
Object.defineProperty(exports, "asociaciones", { enumerable: true, get: function () { return asociaciones_1.asociaciones; } });
const barrios_1 = require("./barrios");
Object.defineProperty(exports, "barrios", { enumerable: true, get: function () { return barrios_1.barrios; } });
const comuneros_1 = require("./comuneros");
Object.defineProperty(exports, "comuneros", { enumerable: true, get: function () { return comuneros_1.comuneros; } });
const comuneros_tipos_doc_1 = require("./comuneros_tipos_doc");
Object.defineProperty(exports, "comuneros_tipos_doc", { enumerable: true, get: function () { return comuneros_tipos_doc_1.comuneros_tipos_doc; } });
const cuota_anual_1 = require("./cuota_anual");
Object.defineProperty(exports, "cuota_anual", { enumerable: true, get: function () { return cuota_anual_1.cuota_anual; } });
const cuotas_factura_1 = require("./cuotas_factura");
Object.defineProperty(exports, "cuotas_factura", { enumerable: true, get: function () { return cuotas_factura_1.cuotas_factura; } });
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
const terrenos_1 = require("./terrenos");
Object.defineProperty(exports, "terrenos", { enumerable: true, get: function () { return terrenos_1.terrenos; } });
const tipo_documentos_1 = require("./tipo_documentos");
Object.defineProperty(exports, "tipo_documentos", { enumerable: true, get: function () { return tipo_documentos_1.tipo_documentos; } });
const usuarios_1 = require("./usuarios");
Object.defineProperty(exports, "usuarios", { enumerable: true, get: function () { return usuarios_1.usuarios; } });
function initModels(sequelize) {
    const anio = anio_1.anio.initModel(sequelize);
    const asociaciones = asociaciones_1.asociaciones.initModel(sequelize);
    const barrios = barrios_1.barrios.initModel(sequelize);
    const comuneros = comuneros_1.comuneros.initModel(sequelize);
    const comuneros_tipos_doc = comuneros_tipos_doc_1.comuneros_tipos_doc.initModel(sequelize);
    const cuota_anual = cuota_anual_1.cuota_anual.initModel(sequelize);
    const cuotas_factura = cuotas_factura_1.cuotas_factura.initModel(sequelize);
    const facturas = facturas_1.facturas.initModel(sequelize);
    const forma_pago = forma_pago_1.forma_pago.initModel(sequelize);
    const nacionalidad = nacionalidad_1.nacionalidad.initModel(sequelize);
    const personas = personas_1.personas.initModel(sequelize);
    const requisito_apr = requisito_apr_1.requisito_apr.initModel(sequelize);
    const requisitos = requisitos_1.requisitos.initModel(sequelize);
    const rol_user = rol_user_1.rol_user.initModel(sequelize);
    const terrenos = terrenos_1.terrenos.initModel(sequelize);
    const tipo_documentos = tipo_documentos_1.tipo_documentos.initModel(sequelize);
    const usuarios = usuarios_1.usuarios.initModel(sequelize);
    comuneros.belongsToMany(tipo_documentos, { as: 'id_tipo_doc_tipo_documentos', through: comuneros_tipos_doc, foreignKey: "id_comunero", otherKey: "id_tipo_doc" });
    tipo_documentos.belongsToMany(comuneros, { as: 'id_comunero_comuneros', through: comuneros_tipos_doc, foreignKey: "id_tipo_doc", otherKey: "id_comunero" });
    cuota_anual.belongsTo(anio, { as: "id_anio_anio", foreignKey: "id_anio" });
    anio.hasMany(cuota_anual, { as: "cuota_anuals", foreignKey: "id_anio" });
    comuneros.belongsTo(asociaciones, { as: "id_aso_asociacione", foreignKey: "id_aso" });
    asociaciones.hasMany(comuneros, { as: "comuneros", foreignKey: "id_aso" });
    comuneros.belongsTo(barrios, { as: "id_barrio_barrio", foreignKey: "id_barrio" });
    barrios.hasMany(comuneros, { as: "comuneros", foreignKey: "id_barrio" });
    comuneros_tipos_doc.belongsTo(comuneros, { as: "id_comunero_comunero", foreignKey: "id_comunero" });
    comuneros.hasMany(comuneros_tipos_doc, { as: "comuneros_tipos_docs", foreignKey: "id_comunero" });
    facturas.belongsTo(comuneros, { as: "id_comunero_comunero", foreignKey: "id_comunero" });
    comuneros.hasMany(facturas, { as: "facturas", foreignKey: "id_comunero" });
    usuarios.belongsTo(comuneros, { as: "id_comunero_comunero", foreignKey: "id_comunero" });
    comuneros.hasMany(usuarios, { as: "usuarios", foreignKey: "id_comunero" });
    cuotas_factura.belongsTo(cuota_anual, { as: "id_cuota_cuota_anual", foreignKey: "id_cuota" });
    cuota_anual.hasMany(cuotas_factura, { as: "cuotas_facturas", foreignKey: "id_cuota" });
    cuotas_factura.belongsTo(cuota_anual, { as: "id_anio_cuota_anual", foreignKey: "id_anio" });
    cuota_anual.hasMany(cuotas_factura, { as: "id_anio_cuotas_facturas", foreignKey: "id_anio" });
    cuotas_factura.belongsTo(facturas, { as: "id_factura_factura", foreignKey: "id_factura" });
    facturas.hasMany(cuotas_factura, { as: "cuotas_facturas", foreignKey: "id_factura" });
    facturas.belongsTo(forma_pago, { as: "id_forma_pago_forma_pago", foreignKey: "id_forma_pago" });
    forma_pago.hasMany(facturas, { as: "facturas", foreignKey: "id_forma_pago" });
    personas.belongsTo(nacionalidad, { as: "id_nacionalidad_nacionalidad", foreignKey: "id_nacionalidad" });
    nacionalidad.hasMany(personas, { as: "personas", foreignKey: "id_nacionalidad" });
    comuneros.belongsTo(personas, { as: "id_persona_persona", foreignKey: "id_persona" });
    personas.hasMany(comuneros, { as: "comuneros", foreignKey: "id_persona" });
    requisito_apr.belongsTo(personas, { as: "id_persona_persona", foreignKey: "id_persona" });
    personas.hasMany(requisito_apr, { as: "requisito_aprs", foreignKey: "id_persona" });
    requisito_apr.belongsTo(requisitos, { as: "id_req_requisito", foreignKey: "id_req" });
    requisitos.hasMany(requisito_apr, { as: "requisito_aprs", foreignKey: "id_req" });
    usuarios.belongsTo(rol_user, { as: "id_rol_rol_user", foreignKey: "id_rol" });
    rol_user.hasMany(usuarios, { as: "usuarios", foreignKey: "id_rol" });
    comuneros.belongsTo(terrenos, { as: "id_terreno_terreno", foreignKey: "id_terreno" });
    terrenos.hasMany(comuneros, { as: "comuneros", foreignKey: "id_terreno" });
    comuneros_tipos_doc.belongsTo(tipo_documentos, { as: "id_tipo_doc_tipo_documento", foreignKey: "id_tipo_doc" });
    tipo_documentos.hasMany(comuneros_tipos_doc, { as: "comuneros_tipos_docs", foreignKey: "id_tipo_doc" });
    return {
        anio: anio,
        asociaciones: asociaciones,
        barrios: barrios,
        comuneros: comuneros,
        comuneros_tipos_doc: comuneros_tipos_doc,
        cuota_anual: cuota_anual,
        cuotas_factura: cuotas_factura,
        facturas: facturas,
        forma_pago: forma_pago,
        nacionalidad: nacionalidad,
        personas: personas,
        requisito_apr: requisito_apr,
        requisitos: requisitos,
        rol_user: rol_user,
        terrenos: terrenos,
        tipo_documentos: tipo_documentos,
        usuarios: usuarios,
    };
}
exports.initModels = initModels;
//# sourceMappingURL=init-models.js.map