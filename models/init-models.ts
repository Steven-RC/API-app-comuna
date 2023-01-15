import type { Sequelize } from "sequelize";
import { asociaciones as _asociaciones } from "./asociaciones";
import type { asociacionesAttributes, asociacionesCreationAttributes } from "./asociaciones";
import { barrios as _barrios } from "./barrios";
import type { barriosAttributes, barriosCreationAttributes } from "./barrios";
import { comuneros as _comuneros } from "./comuneros";
import type { comunerosAttributes, comunerosCreationAttributes } from "./comuneros";
import { cuota_anual as _cuota_anual } from "./cuota_anual";
import type { cuota_anualAttributes, cuota_anualCreationAttributes } from "./cuota_anual";
import { documentos as _documentos } from "./documentos";
import type { documentosAttributes, documentosCreationAttributes } from "./documentos";
import { facturas as _facturas } from "./facturas";
import type { facturasAttributes, facturasCreationAttributes } from "./facturas";
import { forma_pago as _forma_pago } from "./forma_pago";
import type { forma_pagoAttributes, forma_pagoCreationAttributes } from "./forma_pago";
import { nacionalidad as _nacionalidad } from "./nacionalidad";
import type { nacionalidadAttributes, nacionalidadCreationAttributes } from "./nacionalidad";
import { personas as _personas } from "./personas";
import type { personasAttributes, personasCreationAttributes } from "./personas";
import { rol_user as _rol_user } from "./rol_user";
import type { rol_userAttributes, rol_userCreationAttributes } from "./rol_user";
import { tipo_documentos as _tipo_documentos } from "./tipo_documentos";
import type { tipo_documentosAttributes, tipo_documentosCreationAttributes } from "./tipo_documentos";
import { usuarios as _usuarios } from "./usuarios";
import type { usuariosAttributes, usuariosCreationAttributes } from "./usuarios";

export {
  _asociaciones as asociaciones,
  _barrios as barrios,
  _comuneros as comuneros,
  _cuota_anual as cuota_anual,
  _documentos as documentos,
  _facturas as facturas,
  _forma_pago as forma_pago,
  _nacionalidad as nacionalidad,
  _personas as personas,
  _rol_user as rol_user,
  _tipo_documentos as tipo_documentos,
  _usuarios as usuarios,
};

export type {
  asociacionesAttributes,
  asociacionesCreationAttributes,
  barriosAttributes,
  barriosCreationAttributes,
  comunerosAttributes,
  comunerosCreationAttributes,
  cuota_anualAttributes,
  cuota_anualCreationAttributes,
  documentosAttributes,
  documentosCreationAttributes,
  facturasAttributes,
  facturasCreationAttributes,
  forma_pagoAttributes,
  forma_pagoCreationAttributes,
  nacionalidadAttributes,
  nacionalidadCreationAttributes,
  personasAttributes,
  personasCreationAttributes,
  rol_userAttributes,
  rol_userCreationAttributes,
  tipo_documentosAttributes,
  tipo_documentosCreationAttributes,
  usuariosAttributes,
  usuariosCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const asociaciones = _asociaciones.initModel(sequelize);
  const barrios = _barrios.initModel(sequelize);
  const comuneros = _comuneros.initModel(sequelize);
  const cuota_anual = _cuota_anual.initModel(sequelize);
  const documentos = _documentos.initModel(sequelize);
  const facturas = _facturas.initModel(sequelize);
  const forma_pago = _forma_pago.initModel(sequelize);
  const nacionalidad = _nacionalidad.initModel(sequelize);
  const personas = _personas.initModel(sequelize);
  const rol_user = _rol_user.initModel(sequelize);
  const tipo_documentos = _tipo_documentos.initModel(sequelize);
  const usuarios = _usuarios.initModel(sequelize);

  comuneros.belongsTo(asociaciones, { as: "ID_ASO_asociacione", foreignKey: "ID_ASO"});
  asociaciones.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_ASO"});
  comuneros.belongsTo(barrios, { as: "ID_BARRIO_barrio", foreignKey: "ID_BARRIO"});
  barrios.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_BARRIO"});
  documentos.belongsTo(comuneros, { as: "ID_COMUNERO_comunero", foreignKey: "ID_COMUNERO"});
  comuneros.hasMany(documentos, { as: "documentos", foreignKey: "ID_COMUNERO"});
  facturas.belongsTo(comuneros, { as: "ID_COMUNERO_comunero", foreignKey: "ID_COMUNERO"});
  comuneros.hasMany(facturas, { as: "facturas", foreignKey: "ID_COMUNERO"});
  usuarios.belongsTo(comuneros, { as: "ID_COMUNERO_comunero", foreignKey: "ID_COMUNERO"});
  comuneros.hasMany(usuarios, { as: "usuarios", foreignKey: "ID_COMUNERO"});
  comuneros.belongsTo(cuota_anual, { as: "ID_CUOTA_cuota_anual", foreignKey: "ID_CUOTA"});
  cuota_anual.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_CUOTA"});
  forma_pago.belongsTo(facturas, { as: "ID_FACTURA_factura", foreignKey: "ID_FACTURA"});
  facturas.hasMany(forma_pago, { as: "forma_pagos", foreignKey: "ID_FACTURA"});
  personas.belongsTo(nacionalidad, { as: "ID_NACIONALIDAD_nacionalidad", foreignKey: "ID_NACIONALIDAD"});
  nacionalidad.hasMany(personas, { as: "personas", foreignKey: "ID_NACIONALIDAD"});
  comuneros.belongsTo(personas, { as: "ID_PERSONA_persona", foreignKey: "ID_PERSONA"});
  personas.hasMany(comuneros, { as: "comuneros", foreignKey: "ID_PERSONA"});
  usuarios.belongsTo(rol_user, { as: "ID_ROL_rol_user", foreignKey: "ID_ROL"});
  rol_user.hasMany(usuarios, { as: "usuarios", foreignKey: "ID_ROL"});
  documentos.belongsTo(tipo_documentos, { as: "ID_TIPO_DOC_tipo_documento", foreignKey: "ID_TIPO_DOC"});
  tipo_documentos.hasOne(documentos, { as: "documento", foreignKey: "ID_TIPO_DOC"});

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
