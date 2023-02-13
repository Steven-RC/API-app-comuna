import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { comuneros_tipos_doc, comuneros_tipos_docId } from './comuneros_tipos_doc';

export interface tipo_documentosAttributes {
  ID_TIPO_DOC: number;
  TIPO_DOC: string;
  ESTADO_DOC?: number;
  ALIAS?: string;
}

export type tipo_documentosPk = "ID_TIPO_DOC";
export type tipo_documentosId = tipo_documentos[tipo_documentosPk];
export type tipo_documentosOptionalAttributes = "ID_TIPO_DOC" | "ESTADO_DOC" | "ALIAS";
export type tipo_documentosCreationAttributes = Optional<tipo_documentosAttributes, tipo_documentosOptionalAttributes>;

export class tipo_documentos extends Model<tipo_documentosAttributes, tipo_documentosCreationAttributes> implements tipo_documentosAttributes {
  ID_TIPO_DOC!: number;
  TIPO_DOC!: string;
  ESTADO_DOC?: number;
  ALIAS?: string;

  // tipo_documentos belongsToMany comuneros via ID_TIPO_DOC and ID_COMUNERO
  ID_COMUNERO_comuneros!: comuneros[];
  getID_COMUNERO_comuneros!: Sequelize.BelongsToManyGetAssociationsMixin<comuneros>;
  setID_COMUNERO_comuneros!: Sequelize.BelongsToManySetAssociationsMixin<comuneros, comunerosId>;
  addID_COMUNERO_comunero!: Sequelize.BelongsToManyAddAssociationMixin<comuneros, comunerosId>;
  addID_COMUNERO_comuneros!: Sequelize.BelongsToManyAddAssociationsMixin<comuneros, comunerosId>;
  createID_COMUNERO_comunero!: Sequelize.BelongsToManyCreateAssociationMixin<comuneros>;
  removeID_COMUNERO_comunero!: Sequelize.BelongsToManyRemoveAssociationMixin<comuneros, comunerosId>;
  removeID_COMUNERO_comuneros!: Sequelize.BelongsToManyRemoveAssociationsMixin<comuneros, comunerosId>;
  hasID_COMUNERO_comunero!: Sequelize.BelongsToManyHasAssociationMixin<comuneros, comunerosId>;
  hasID_COMUNERO_comuneros!: Sequelize.BelongsToManyHasAssociationsMixin<comuneros, comunerosId>;
  countID_COMUNERO_comuneros!: Sequelize.BelongsToManyCountAssociationsMixin;
  // tipo_documentos hasMany comuneros_tipos_doc via ID_TIPO_DOC
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

  static initModel(sequelize: Sequelize.Sequelize): typeof tipo_documentos {
    return tipo_documentos.init({
    ID_TIPO_DOC: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TIPO_DOC: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ESTADO_DOC: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    ALIAS: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipo_documentos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_TIPO_DOC" },
        ]
      },
    ]
  });
  }
}
