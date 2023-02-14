import type { Sequelize } from "sequelize";
import { Anio as _anio } from "./anio";
import type { anioAttributes, anioCreationAttributes } from "./anio";
import { Asociaciones as _asociaciones } from "./asociaciones";
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
import { Nacionalidad as _nacionalidad } from "./nacionalidad";
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
  _asociaciones as Asociaciones,
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

  comuneros.belongsToMany(tipo_documentos, { as: 'ID_TIPO_DOC_tipo_documentos', through: comuneros_tipos_doc, foreignKey: "ID_COMUNERO", otherKey: "ID_TIPO_DOC" });
  tipo_documentos.belongsToMany(comuneros, { as: 'ID_COMUNERO_comuneros', through: comuneros_tipos_doc, foreignKey: "ID_TIPO_DOC", otherKey: "ID_COMUNERO" });
  cuota_anual.belongsTo(anio, { as: "ID_ANIO_anio", foreignKey: "ID_ANIO"});
  anio.hasMany(cuota_anual, { as: "cuota_anuals", foreignKey: "ID_ANIO"});
  comuneros.belongsTo(asociaciones, { as: "ID_ASO_asociacione", foreignKey: "ID_ASO"});
  asociaciones.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_ASO"});
  comuneros.belongsTo(barrios, { as: "ID_BARRIO_barrio", foreignKey: "ID_BARRIO"});
  barrios.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_BARRIO"});
  comuneros_tipos_doc.belongsTo(comuneros, { as: "ID_COMUNERO_comunero", foreignKey: "ID_COMUNERO"});
  comuneros.hasMany(comuneros_tipos_doc, { as: "comuneros_tipos_docs", foreignKey: "ID_COMUNERO"});
  facturas.belongsTo(comuneros, { as: "ID_COMUNERO_comunero", foreignKey: "ID_COMUNERO"});
  comuneros.hasMany(facturas, { as: "facturas", foreignKey: "ID_COMUNERO"});
  usuarios.belongsTo(comuneros, { as: "ID_COMUNERO_comunero", foreignKey: "ID_COMUNERO"});
  comuneros.hasMany(usuarios, { as: "usuarios", foreignKey: "ID_COMUNERO"});
  cuotas_factura.belongsTo(cuota_anual, { as: "ID_CUOTA_cuota_anual", foreignKey: "ID_CUOTA"});
  cuota_anual.hasMany(cuotas_factura, { as: "cuotas_facturas", foreignKey: "ID_CUOTA"});
  cuotas_factura.belongsTo(cuota_anual, { as: "ID_ANIO_cuota_anual", foreignKey: "ID_ANIO"});
  cuota_anual.hasMany(cuotas_factura, { as: "ID_ANIO_cuotas_facturas", foreignKey: "ID_ANIO"});
  cuotas_factura.belongsTo(facturas, { as: "ID_FACTURA_factura", foreignKey: "ID_FACTURA"});
  facturas.hasMany(cuotas_factura, { as: "cuotas_facturas", foreignKey: "ID_FACTURA"});
  facturas.belongsTo(forma_pago, { as: "ID_FORMA_PAGO_forma_pago", foreignKey: "ID_FORMA_PAGO"});
  forma_pago.hasMany(facturas, { as: "facturas", foreignKey: "ID_FORMA_PAGO"});
  personas.belongsTo(nacionalidad, { as: "ID_NACIONALIDAD_nacionalidad", foreignKey: "ID_NACIONALIDAD"});
  nacionalidad.hasMany(personas, { as: "personas", foreignKey: "ID_NACIONALIDAD"});
  comuneros.belongsTo(personas, { as: "ID_PERSONA_persona", foreignKey: "ID_PERSONA"});
  personas.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_PERSONA"});
  requisito_apr.belongsTo(personas, { as: "ID_PERSONA_persona", foreignKey: "ID_PERSONA"});
  personas.hasMany(requisito_apr, { as: "requisito_aprs", foreignKey: "ID_PERSONA"});
  requisito_apr.belongsTo(requisitos, { as: "ID_REQ_requisito", foreignKey: "ID_REQ"});
  requisitos.hasMany(requisito_apr, { as: "requisito_aprs", foreignKey: "ID_REQ"});
  usuarios.belongsTo(rol_user, { as: "ID_ROL_rol_user", foreignKey: "ID_ROL"});
  rol_user.hasMany(usuarios, { as: "usuarios", foreignKey: "ID_ROL"});
  comuneros.belongsTo(terrenos, { as: "ID_TERRENO_terreno", foreignKey: "ID_TERRENO"});
  terrenos.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_TERRENO"});
  comuneros_tipos_doc.belongsTo(tipo_documentos, { as: "ID_TIPO_DOC_tipo_documento", foreignKey: "ID_TIPO_DOC"});
  tipo_documentos.hasMany(comuneros_tipos_doc, { as: "comuneros_tipos_docs", foreignKey: "ID_TIPO_DOC"});

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
    Nacionalidad: nacionalidad,
    personas: personas,
    requisito_apr: requisito_apr,
    requisitos: requisitos,
    rol_user: rol_user,
    terrenos: terrenos,
    tipo_documentos: tipo_documentos,
    usuarios: usuarios,
  };
}
