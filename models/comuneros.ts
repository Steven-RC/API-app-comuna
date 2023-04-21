import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { asociaciones, asociacionesId } from './asociaciones';
import type { barrios, barriosId } from './barrios';
import type { comuneros_tipos_doc, comuneros_tipos_docId } from './comuneros_tipos_doc';
import type { facturas, facturasId } from './facturas';
import type { personas, personasId } from './personas';
import type { terrenos, terrenosId } from './terrenos';
import type { tipo_documentos, tipo_documentosId } from './tipo_documentos';
import type { usuarios, usuariosId } from './usuarios';

export interface comunerosAttributes {
  id_comunero: string;
  id_barrio?: string;
  id_aso?: string;
  id_persona?: string;
  calificado?: number;
  created_date?: string;
  created_time?: string;
  estado_com?: number;
  id_terreno?: string;
}

export type comunerosPk = "id_comunero";
export type comunerosId = comuneros[comunerosPk];
export type comunerosOptionalAttributes = "id_barrio" | "id_aso" | "id_persona" | "calificado" | "created_date" | "created_time" | "estado_com" | "id_terreno";
export type comunerosCreationAttributes = Optional<comunerosAttributes, comunerosOptionalAttributes>;

export class comuneros extends Model<comunerosAttributes, comunerosCreationAttributes> implements comunerosAttributes {
  id_comunero!: string;
  id_barrio?: string;
  id_aso?: string;
  id_persona?: string;
  calificado?: number;
  created_date?: string;
  created_time?: string;
  estado_com?: number;
  id_terreno?: string;

  // comuneros belongsTo asociaciones via id_aso
  id_aso_asociacione!: asociaciones;
  getId_aso_asociacione!: Sequelize.BelongsToGetAssociationMixin<asociaciones>;
  setId_aso_asociacione!: Sequelize.BelongsToSetAssociationMixin<asociaciones, asociacionesId>;
  createId_aso_asociacione!: Sequelize.BelongsToCreateAssociationMixin<asociaciones>;
  // comuneros belongsTo barrios via id_barrio
  id_barrio_barrio!: barrios;
  getId_barrio_barrio!: Sequelize.BelongsToGetAssociationMixin<barrios>;
  setId_barrio_barrio!: Sequelize.BelongsToSetAssociationMixin<barrios, barriosId>;
  createId_barrio_barrio!: Sequelize.BelongsToCreateAssociationMixin<barrios>;
  // comuneros hasMany comuneros_tipos_doc via id_comunero
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
  // comuneros hasMany facturas via id_comunero
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
  // comuneros belongsToMany tipo_documentos via id_comunero and id_tipo_doc
  id_tipo_doc_tipo_documentos!: tipo_documentos[];
  getId_tipo_doc_tipo_documentos!: Sequelize.BelongsToManyGetAssociationsMixin<tipo_documentos>;
  setId_tipo_doc_tipo_documentos!: Sequelize.BelongsToManySetAssociationsMixin<tipo_documentos, tipo_documentosId>;
  addId_tipo_doc_tipo_documento!: Sequelize.BelongsToManyAddAssociationMixin<tipo_documentos, tipo_documentosId>;
  addId_tipo_doc_tipo_documentos!: Sequelize.BelongsToManyAddAssociationsMixin<tipo_documentos, tipo_documentosId>;
  createId_tipo_doc_tipo_documento!: Sequelize.BelongsToManyCreateAssociationMixin<tipo_documentos>;
  removeId_tipo_doc_tipo_documento!: Sequelize.BelongsToManyRemoveAssociationMixin<tipo_documentos, tipo_documentosId>;
  removeId_tipo_doc_tipo_documentos!: Sequelize.BelongsToManyRemoveAssociationsMixin<tipo_documentos, tipo_documentosId>;
  hasId_tipo_doc_tipo_documento!: Sequelize.BelongsToManyHasAssociationMixin<tipo_documentos, tipo_documentosId>;
  hasId_tipo_doc_tipo_documentos!: Sequelize.BelongsToManyHasAssociationsMixin<tipo_documentos, tipo_documentosId>;
  countId_tipo_doc_tipo_documentos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // comuneros hasMany usuarios via id_comunero
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
  // comuneros belongsTo personas via id_persona
  id_persona_persona!: personas;
  getId_persona_persona!: Sequelize.BelongsToGetAssociationMixin<personas>;
  setId_persona_persona!: Sequelize.BelongsToSetAssociationMixin<personas, personasId>;
  createId_persona_persona!: Sequelize.BelongsToCreateAssociationMixin<personas>;
  // comuneros belongsTo terrenos via id_terreno
  id_terreno_terreno!: terrenos;
  getId_terreno_terreno!: Sequelize.BelongsToGetAssociationMixin<terrenos>;
  setId_terreno_terreno!: Sequelize.BelongsToSetAssociationMixin<terrenos, terrenosId>;
  createId_terreno_terreno!: Sequelize.BelongsToCreateAssociationMixin<terrenos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comuneros {
    return comuneros.init({
    id_comunero: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    id_barrio: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'barrios',
        key: 'id_barrio'
      }
    },
    id_aso: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'asociaciones',
        key: 'id_aso'
      }
    },
    id_persona: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'personas',
        key: 'id_persona'
      }
    },
    calificado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    created_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    estado_com: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    id_terreno: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'terrenos',
        key: 'id_terreno'
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
          { name: "id_comunero" },
        ]
      },
      {
        name: "fk_rel_asociacion_comunero",
        using: "BTREE",
        fields: [
          { name: "id_aso" },
        ]
      },
      {
        name: "fk_rel_barrio_comunero",
        using: "BTREE",
        fields: [
          { name: "id_barrio" },
        ]
      },
      {
        name: "fk_rel_pers_comunero",
        using: "BTREE",
        fields: [
          { name: "id_persona" },
        ]
      },
      {
        name: "fk_comuneros_terrenos1_idx",
        using: "BTREE",
        fields: [
          { name: "id_terreno" },
        ]
      },
    ]
  });
  }
}
