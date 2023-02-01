import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asociaciones, asociacionesId } from './asociaciones';
import type { barrios, barriosId } from './barrios';
import type { documentos, documentosId } from './documentos';
import type { facturas, facturasId } from './facturas';
import type { personas, personasId } from './personas';
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
}

export type comunerosPk = "ID_COMUNERO";
export type comunerosId = comuneros[comunerosPk];
export type comunerosOptionalAttributes = "ID_COMUNERO" | "ID_BARRIO" | "ID_ASO" | "ID_PERSONA" | "CALIFICADO" | "CREATED_DATE" | "CREATED_TIME" | "ESTADO_COM";
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

  // comuneros belongsTo asociaciones via ID_ASO
  ID_ASO_asociacione!: asociaciones;
  getID_ASO_asociacione!: Sequelize.BelongsToGetAssociationMixin<asociaciones>;
  setID_ASO_asociacione!: Sequelize.BelongsToSetAssociationMixin<asociaciones, asociacionesId>;
  createID_ASO_asociacione!: Sequelize.BelongsToCreateAssociationMixin<asociaciones>;
  // comuneros belongsTo barrios via ID_BARRIO
  ID_BARRIO_barrio!: barrios;
  getID_BARRIO_barrio!: Sequelize.BelongsToGetAssociationMixin<barrios>;
  setID_BARRIO_barrio!: Sequelize.BelongsToSetAssociationMixin<barrios, barriosId>;
  createID_BARRIO_barrio!: Sequelize.BelongsToCreateAssociationMixin<barrios>;
  // comuneros hasMany documentos via ID_COMUNERO
  documentos!: documentos[];
  getDocumentos!: Sequelize.HasManyGetAssociationsMixin<documentos>;
  setDocumentos!: Sequelize.HasManySetAssociationsMixin<documentos, documentosId>;
  addDocumento!: Sequelize.HasManyAddAssociationMixin<documentos, documentosId>;
  addDocumentos!: Sequelize.HasManyAddAssociationsMixin<documentos, documentosId>;
  createDocumento!: Sequelize.HasManyCreateAssociationMixin<documentos>;
  removeDocumento!: Sequelize.HasManyRemoveAssociationMixin<documentos, documentosId>;
  removeDocumentos!: Sequelize.HasManyRemoveAssociationsMixin<documentos, documentosId>;
  hasDocumento!: Sequelize.HasManyHasAssociationMixin<documentos, documentosId>;
  hasDocumentos!: Sequelize.HasManyHasAssociationsMixin<documentos, documentosId>;
  countDocumentos!: Sequelize.HasManyCountAssociationsMixin;
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
    ]
  });
  }
}
