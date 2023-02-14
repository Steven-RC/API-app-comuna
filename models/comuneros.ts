import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Asociaciones, asociacionesId } from './asociaciones';
import type { barrios, barriosId } from './barrios';
import type { comuneros_tipos_doc, comuneros_tipos_docId } from './comuneros_tipos_doc';
import type { facturas, facturasId } from './facturas';
import type { personas, personasId } from './personas';
import type { terrenos, terrenosId } from './terrenos';
import type { tipo_documentos, tipo_documentosId } from './tipo_documentos';
import type { usuarios, usuariosId } from './usuarios';

export interface comunerosAttributes {
  ID_COMUNERO: number;
  ID_BARRIO?: number;
  ID_ASO?: number;
  ID_PERSONA?: number;
  CALIFICADO?: number;
  CREATED_DATE?: string;
  CREATED_TIME?: string;
  ESTADO_COM?: number;
  ID_TERRENO?: number;
}

export type comunerosPk = "ID_COMUNERO";
export type comunerosId = comuneros[comunerosPk];
export type comunerosOptionalAttributes = "ID_COMUNERO" | "ID_BARRIO" | "ID_ASO" | "ID_PERSONA" | "CALIFICADO" | "CREATED_DATE" | "CREATED_TIME" | "ESTADO_COM" | "ID_TERRENO";
export type comunerosCreationAttributes = Optional<comunerosAttributes, comunerosOptionalAttributes>;

export class comuneros extends Model<comunerosAttributes, comunerosCreationAttributes> implements comunerosAttributes {
  ID_COMUNERO!: number;
  ID_BARRIO?: number;
  ID_ASO?: number;
  ID_PERSONA?: number;
  CALIFICADO?: number;
  CREATED_DATE?: string;
  CREATED_TIME?: string;
  ESTADO_COM?: number;
  ID_TERRENO?: number;

  // comuneros belongsTo asociaciones via ID_ASO
  ID_ASO_asociacione!: Asociaciones;
  getID_ASO_asociacione!: Sequelize.BelongsToGetAssociationMixin<Asociaciones>;
  setID_ASO_asociacione!: Sequelize.BelongsToSetAssociationMixin<Asociaciones, asociacionesId>;
  createID_ASO_asociacione!: Sequelize.BelongsToCreateAssociationMixin<Asociaciones>;
  // comuneros belongsTo barrios via ID_BARRIO
  ID_BARRIO_barrio!: barrios;
  getID_BARRIO_barrio!: Sequelize.BelongsToGetAssociationMixin<barrios>;
  setID_BARRIO_barrio!: Sequelize.BelongsToSetAssociationMixin<barrios, barriosId>;
  createID_BARRIO_barrio!: Sequelize.BelongsToCreateAssociationMixin<barrios>;
  // comuneros hasMany comuneros_tipos_doc via ID_COMUNERO
  comuneros_tipos_docs!: comuneros_tipos_doc[];
  getComuneros_tipos_docs!: Sequelize.HasManyGetAssociationsMixin<comuneros_tipos_doc>;
  setComuneros_tipos_docs!: Sequelize.HasManySetAssociationsMixin<comuneros_tipos_doc, comuneros_tipos_docId>;
  addComuneros_tipos_doc!: Sequelize.HasManyAddAssociationMixin<comuneros_tipos_doc, comuneros_tipos_docId>;
  addComuneros_tipos_docs!: Sequelize.HasManyAddAssociationsMixin<comuneros_tipos_doc, comuneros_tipos_docId>;
  createComuneros_tipos_doc!: Sequelize.HasManyCreateAssociationMixin<comuneros_tipos_doc>;
  removeComuneros_tipos_doc!: Sequelize.HasManyRemoveAssociationMixin<comuneros_tipos_doc, comuneros_tipos_docId>;
  removeComuneros_tipos_docs!: Sequelize.HasManyRemoveAssociationsMixin<comuneros_tipos_doc, comuneros_tipos_docId>;
  hasComuneros_tipos_doc!: Sequelize.HasManyHasAssociationMixin<comuneros_tipos_doc, comuneros_tipos_docId>;
  hasComuneros_tipos_docs!: Sequelize.HasManyHasAssociationsMixin<comuneros_tipos_doc, comuneros_tipos_docId>;
  countComuneros_tipos_docs!: Sequelize.HasManyCountAssociationsMixin;
  // comuneros hasMany facturas via ID_COMUNERO
  facturas!: facturas[];
  getFacturas!: Sequelize.HasManyGetAssociationsMixin<facturas>;
  setFacturas!: Sequelize.HasManySetAssociationsMixin<facturas, facturasId>;
  addFactura!: Sequelize.HasManyAddAssociationMixin<facturas, facturasId>;
  addFacturas!: Sequelize.HasManyAddAssociationsMixin<facturas, facturasId>;
  createFactura!: Sequelize.HasManyCreateAssociationMixin<facturas>;
  removeFactura!: Sequelize.HasManyRemoveAssociationMixin<facturas, facturasId>;
  removeFacturas!: Sequelize.HasManyRemoveAssociationsMixin<facturas, facturasId>;
  hasFactura!: Sequelize.HasManyHasAssociationMixin<facturas, facturasId>;
  hasFacturas!: Sequelize.HasManyHasAssociationsMixin<facturas, facturasId>;
  countFacturas!: Sequelize.HasManyCountAssociationsMixin;
  // comuneros belongsToMany tipo_documentos via ID_COMUNERO and ID_TIPO_DOC
  ID_TIPO_DOC_tipo_documentos!: tipo_documentos[];
  getID_TIPO_DOC_tipo_documentos!: Sequelize.BelongsToManyGetAssociationsMixin<tipo_documentos>;
  setID_TIPO_DOC_tipo_documentos!: Sequelize.BelongsToManySetAssociationsMixin<tipo_documentos, tipo_documentosId>;
  addID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToManyAddAssociationMixin<tipo_documentos, tipo_documentosId>;
  addID_TIPO_DOC_tipo_documentos!: Sequelize.BelongsToManyAddAssociationsMixin<tipo_documentos, tipo_documentosId>;
  createID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToManyCreateAssociationMixin<tipo_documentos>;
  removeID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToManyRemoveAssociationMixin<tipo_documentos, tipo_documentosId>;
  removeID_TIPO_DOC_tipo_documentos!: Sequelize.BelongsToManyRemoveAssociationsMixin<tipo_documentos, tipo_documentosId>;
  hasID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToManyHasAssociationMixin<tipo_documentos, tipo_documentosId>;
  hasID_TIPO_DOC_tipo_documentos!: Sequelize.BelongsToManyHasAssociationsMixin<tipo_documentos, tipo_documentosId>;
  countID_TIPO_DOC_tipo_documentos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // comuneros hasMany usuarios via ID_COMUNERO
  usuarios!: usuarios[];
  getUsuarios!: Sequelize.HasManyGetAssociationsMixin<usuarios>;
  setUsuarios!: Sequelize.HasManySetAssociationsMixin<usuarios, usuariosId>;
  addUsuario!: Sequelize.HasManyAddAssociationMixin<usuarios, usuariosId>;
  addUsuarios!: Sequelize.HasManyAddAssociationsMixin<usuarios, usuariosId>;
  createUsuario!: Sequelize.HasManyCreateAssociationMixin<usuarios>;
  removeUsuario!: Sequelize.HasManyRemoveAssociationMixin<usuarios, usuariosId>;
  removeUsuarios!: Sequelize.HasManyRemoveAssociationsMixin<usuarios, usuariosId>;
  hasUsuario!: Sequelize.HasManyHasAssociationMixin<usuarios, usuariosId>;
  hasUsuarios!: Sequelize.HasManyHasAssociationsMixin<usuarios, usuariosId>;
  countUsuarios!: Sequelize.HasManyCountAssociationsMixin;
  // comuneros belongsTo personas via ID_PERSONA
  ID_PERSONA_persona!: personas;
  getID_PERSONA_persona!: Sequelize.BelongsToGetAssociationMixin<personas>;
  setID_PERSONA_persona!: Sequelize.BelongsToSetAssociationMixin<personas, personasId>;
  createID_PERSONA_persona!: Sequelize.BelongsToCreateAssociationMixin<personas>;
  // comuneros belongsTo terrenos via ID_TERRENO
  ID_TERRENO_terreno!: terrenos;
  getID_TERRENO_terreno!: Sequelize.BelongsToGetAssociationMixin<terrenos>;
  setID_TERRENO_terreno!: Sequelize.BelongsToSetAssociationMixin<terrenos, terrenosId>;
  createID_TERRENO_terreno!: Sequelize.BelongsToCreateAssociationMixin<terrenos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comuneros {
    return comuneros.init({
    ID_COMUNERO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_BARRIO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'barrios',
        key: 'ID_BARRIO'
      }
    },
    ID_ASO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'asociaciones',
        key: 'ID_ASO'
      }
    },
    ID_PERSONA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'personas',
        key: 'ID_PERSONA'
      }
    },
    CALIFICADO: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    CREATED_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CREATED_TIME: {
      type: DataTypes.TIME,
      allowNull: true
    },
    ESTADO_COM: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    ID_TERRENO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'terrenos',
        key: 'ID_TERRENO'
      }
    }
  }, {
    sequelize,
    tableName: 'comuneros',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_COMUNERO" },
        ]
      },
      {
        name: "FK_REL_ASOCIACION_COMUNERO",
        using: "BTREE",
        fields: [
          { name: "ID_ASO" },
        ]
      },
      {
        name: "FK_REL_BARRIO_COMUNERO",
        using: "BTREE",
        fields: [
          { name: "ID_BARRIO" },
        ]
      },
      {
        name: "FK_REL_PERS_COMUNERO",
        using: "BTREE",
        fields: [
          { name: "ID_PERSONA" },
        ]
      },
      {
        name: "fk_comuneros_terrenos1_idx",
        using: "BTREE",
        fields: [
          { name: "ID_TERRENO" },
        ]
      },
    ]
  });
  }
}
