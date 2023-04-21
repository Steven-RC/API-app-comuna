import type { Sequelize } from "sequelize";
import { anio as _anio } from "./anio";
import type { anioAttributes, anioCreationAttributes } from "./anio";
import { asociaciones as _asociaciones } from "./asociaciones";
import type { asociacionesAttributes, asociacionesCreationAttributes } from "./asociaciones";
import { barrios as _barrios } from "./barrios";
import type { barriosAttributes, barriosCreationAttributes } from "./barrios";
import { comuneros as _comuneros } from "./comuneros";
import type { comunerosAttributes, comunerosCreationAttributes } from "./comuneros";
import { comuneros_tipos_doc as _comuneros_tipos_doc } from "./comuneros_tipos_doc";
import type { comuneros_tipos_docAttributes, comuneros_tipos_docCreationAttributes } from "./comuneros_tipos_doc";
import { cuota_anual as _cuota_anual } from "./cuota_anual";
import type { cuota_anualAttributes, cuota_anualCreationAttributes } from "./cuota_anual";
import { cuotas_factura as _cuotas_factura } from "./cuotas_factura";
import type { cuotas_facturaAttributes, cuotas_facturaCreationAttributes } from "./cuotas_factura";
import { facturas as _facturas } from "./facturas";
import type { facturasAttributes, facturasCreationAttributes } from "./facturas";
import { forma_pago as _forma_pago } from "./forma_pago";
import type { forma_pagoAttributes, forma_pagoCreationAttributes } from "./forma_pago";
import { nacionalidad as _nacionalidad } from "./nacionalidad";
import type { nacionalidadAttributes, nacionalidadCreationAttributes } from "./nacionalidad";
import { personas as _personas } from "./personas";
import type { personasAttributes, personasCreationAttributes } from "./personas";
import { requisito_apr as _requisito_apr } from "./requisito_apr";
import type { requisito_aprAttributes, requisito_aprCreationAttributes } from "./requisito_apr";
import { requisitos as _requisitos } from "./requisitos";
import type { requisitosAttributes, requisitosCreationAttributes } from "./requisitos";
import { rol_user as _rol_user } from "./rol_user";
import type { rol_userAttributes, rol_userCreationAttributes } from "./rol_user";
import { terrenos as _terrenos } from "./terrenos";
import type { terrenosAttributes, terrenosCreationAttributes } from "./terrenos";
import { tipo_documentos as _tipo_documentos } from "./tipo_documentos";
import type { tipo_documentosAttributes, tipo_documentosCreationAttributes } from "./tipo_documentos";
import { usuarios as _usuarios } from "./usuarios";
import type { usuariosAttributes, usuariosCreationAttributes } from "./usuarios";

export {
  _anio as anio,
  _asociaciones as asociaciones,
  _barrios as barrios,
  _comuneros as comuneros,
  _comuneros_tipos_doc as comuneros_tipos_doc,
  _cuota_anual as cuota_anual,
  _cuotas_factura as cuotas_factura,
  _facturas as facturas,
  _forma_pago as forma_pago,
  _nacionalidad as nacionalidad,
  _personas as personas,
  _requisito_apr as requisito_apr,
  _requisitos as requisitos,
  _rol_user as rol_user,
  _terrenos as terrenos,
  _tipo_documentos as tipo_documentos,
  _usuarios as usuarios,
};

export type {
  anioAttributes,
  anioCreationAttributes,
  asociacionesAttributes,
  asociacionesCreationAttributes,
  barriosAttributes,
  barriosCreationAttributes,
  comunerosAttributes,
  comunerosCreationAttributes,
  comuneros_tipos_docAttributes,
  comuneros_tipos_docCreationAttributes,
  cuota_anualAttributes,
  cuota_anualCreationAttributes,
  cuotas_facturaAttributes,
  cuotas_facturaCreationAttributes,
  facturasAttributes,
  facturasCreationAttributes,
  forma_pagoAttributes,
  forma_pagoCreationAttributes,
  nacionalidadAttributes,
  nacionalidadCreationAttributes,
  personasAttributes,
  personasCreationAttributes,
  requisito_aprAttributes,
  requisito_aprCreationAttributes,
  requisitosAttributes,
  requisitosCreationAttributes,
  rol_userAttributes,
  rol_userCreationAttributes,
  terrenosAttributes,
  terrenosCreationAttributes,
  tipo_documentosAttributes,
  tipo_documentosCreationAttributes,
  usuariosAttributes,
  usuariosCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const anio = _anio.initModel(sequelize);
  const asociaciones = _asociaciones.initModel(sequelize);
  const barrios = _barrios.initModel(sequelize);
  const comuneros = _comuneros.initModel(sequelize);
  const comuneros_tipos_doc = _comuneros_tipos_doc.initModel(sequelize);
  const cuota_anual = _cuota_anual.initModel(sequelize);
  const cuotas_factura = _cuotas_factura.initModel(sequelize);
  const facturas = _facturas.initModel(sequelize);
  const forma_pago = _forma_pago.initModel(sequelize);
  const nacionalidad = _nacionalidad.initModel(sequelize);
  const personas = _personas.initModel(sequelize);
  const requisito_apr = _requisito_apr.initModel(sequelize);
  const requisitos = _requisitos.initModel(sequelize);
  const rol_user = _rol_user.initModel(sequelize);
  const terrenos = _terrenos.initModel(sequelize);
  const tipo_documentos = _tipo_documentos.initModel(sequelize);
  const usuarios = _usuarios.initModel(sequelize);

  comuneros.belongsToMany(tipo_documentos, { as: 'id_tipo_doc_tipo_documentos', through: comuneros_tipos_doc, foreignKey: "id_comunero", otherKey: "id_tipo_doc" });
  tipo_documentos.belongsToMany(comuneros, { as: 'id_comunero_comuneros', through: comuneros_tipos_doc, foreignKey: "id_tipo_doc", otherKey: "id_comunero" });
  cuota_anual.belongsTo(anio, { as: "id_anio_anio", foreignKey: "id_anio"});
  anio.hasMany(cuota_anual, { as: "cuota_anuals", foreignKey: "id_anio"});
  comuneros.belongsTo(asociaciones, { as: "id_aso_asociacione", foreignKey: "id_aso"});
  asociaciones.hasMany(comuneros, { as: "comuneros", foreignKey: "id_aso"});
  comuneros.belongsTo(barrios, { as: "id_barrio_barrio", foreignKey: "id_barrio"});
  barrios.hasMany(comuneros, { as: "comuneros", foreignKey: "id_barrio"});
  comuneros_tipos_doc.belongsTo(comuneros, { as: "id_comunero_comunero", foreignKey: "id_comunero"});
  comuneros.hasMany(comuneros_tipos_doc, { as: "comuneros_tipos_docs", foreignKey: "id_comunero"});
  facturas.belongsTo(comuneros, { as: "id_comunero_comunero", foreignKey: "id_comunero"});
  comuneros.hasMany(facturas, { as: "facturas", foreignKey: "id_comunero"});
  usuarios.belongsTo(comuneros, { as: "id_comunero_comunero", foreignKey: "id_comunero"});
  comuneros.hasMany(usuarios, { as: "usuarios", foreignKey: "id_comunero"});
  cuotas_factura.belongsTo(cuota_anual, { as: "id_cuota_cuota_anual", foreignKey: "id_cuota"});
  cuota_anual.hasMany(cuotas_factura, { as: "cuotas_facturas", foreignKey: "id_cuota"});
  cuotas_factura.belongsTo(cuota_anual, { as: "id_anio_cuota_anual", foreignKey: "id_anio"});
  cuota_anual.hasMany(cuotas_factura, { as: "id_anio_cuotas_facturas", foreignKey: "id_anio"});
  cuotas_factura.belongsTo(facturas, { as: "id_factura_factura", foreignKey: "id_factura"});
  facturas.hasMany(cuotas_factura, { as: "cuotas_facturas", foreignKey: "id_factura"});
  facturas.belongsTo(forma_pago, { as: "id_forma_pago_forma_pago", foreignKey: "id_forma_pago"});
  forma_pago.hasMany(facturas, { as: "facturas", foreignKey: "id_forma_pago"});
  personas.belongsTo(nacionalidad, { as: "id_nacionalidad_nacionalidad", foreignKey: "id_nacionalidad"});
  nacionalidad.hasMany(personas, { as: "personas", foreignKey: "id_nacionalidad"});
  comuneros.belongsTo(personas, { as: "id_persona_persona", foreignKey: "id_persona"});
  personas.hasMany(comuneros, { as: "comuneros", foreignKey: "id_persona"});
  requisito_apr.belongsTo(personas, { as: "id_persona_persona", foreignKey: "id_persona"});
  personas.hasMany(requisito_apr, { as: "requisito_aprs", foreignKey: "id_persona"});
  requisito_apr.belongsTo(requisitos, { as: "id_req_requisito", foreignKey: "id_req"});
  requisitos.hasMany(requisito_apr, { as: "requisito_aprs", foreignKey: "id_req"});
  usuarios.belongsTo(rol_user, { as: "id_rol_rol_user", foreignKey: "id_rol"});
  rol_user.hasMany(usuarios, { as: "usuarios", foreignKey: "id_rol"});
  comuneros.belongsTo(terrenos, { as: "id_terreno_terreno", foreignKey: "id_terreno"});
  terrenos.hasMany(comuneros, { as: "comuneros", foreignKey: "id_terreno"});
  comuneros_tipos_doc.belongsTo(tipo_documentos, { as: "id_tipo_doc_tipo_documento", foreignKey: "id_tipo_doc"});
  tipo_documentos.hasMany(comuneros_tipos_doc, { as: "comuneros_tipos_docs", foreignKey: "id_tipo_doc"});

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
