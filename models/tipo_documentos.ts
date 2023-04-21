import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { comuneros_tipos_doc, comuneros_tipos_docId } from './comuneros_tipos_doc';

export interface tipo_documentosAttributes {
  id_tipo_doc: string;
  tipo_doc: string;
  estado_doc?: number;
  alias?: string;
}

export type tipo_documentosPk = "id_tipo_doc";
export type tipo_documentosId = tipo_documentos[tipo_documentosPk];
export type tipo_documentosOptionalAttributes = "estado_doc" | "alias";
export type tipo_documentosCreationAttributes = Optional<tipo_documentosAttributes, tipo_documentosOptionalAttributes>;

export class tipo_documentos extends Model<tipo_documentosAttributes, tipo_documentosCreationAttributes> implements tipo_documentosAttributes {
  id_tipo_doc!: string;
  tipo_doc!: string;
  estado_doc?: number;
  alias?: string;

  // tipo_documentos belongsToMany comuneros via id_tipo_doc and id_comunero
  id_comunero_comuneros!: comuneros[];
  getId_comunero_comuneros!: Sequelize.BelongsToManyGetAssociationsMixin<comuneros>;
  setId_comunero_comuneros!: Sequelize.BelongsToManySetAssociationsMixin<comuneros, comunerosId>;
  addId_comunero_comunero!: Sequelize.BelongsToManyAddAssociationMixin<comuneros, comunerosId>;
  addId_comunero_comuneros!: Sequelize.BelongsToManyAddAssociationsMixin<comuneros, comunerosId>;
  createId_comunero_comunero!: Sequelize.BelongsToManyCreateAssociationMixin<comuneros>;
  removeId_comunero_comunero!: Sequelize.BelongsToManyRemoveAssociationMixin<comuneros, comunerosId>;
  removeId_comunero_comuneros!: Sequelize.BelongsToManyRemoveAssociationsMixin<comuneros, comunerosId>;
  hasId_comunero_comunero!: Sequelize.BelongsToManyHasAssociationMixin<comuneros, comunerosId>;
  hasId_comunero_comuneros!: Sequelize.BelongsToManyHasAssociationsMixin<comuneros, comunerosId>;
  countId_comunero_comuneros!: Sequelize.BelongsToManyCountAssociationsMixin;
  // tipo_documentos hasMany comuneros_tipos_doc via id_tipo_doc
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
    id_tipo_doc: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    tipo_doc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estado_doc: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    alias: {
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
          { name: "id_tipo_doc" },
        ]
      },
    ]
  });
  }
}
