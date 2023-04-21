import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { tipo_documentos, tipo_documentosId } from './tipo_documentos';

export interface comuneros_tipos_docAttributes {
  id_comunero: string;
  id_tipo_doc: string;
  documento?: string;
}

export type comuneros_tipos_docPk = "id_comunero" | "id_tipo_doc";
export type comuneros_tipos_docId = comuneros_tipos_doc[comuneros_tipos_docPk];
export type comuneros_tipos_docOptionalAttributes = "documento";
export type comuneros_tipos_docCreationAttributes = Optional<comuneros_tipos_docAttributes, comuneros_tipos_docOptionalAttributes>;

export class comuneros_tipos_doc extends Model<comuneros_tipos_docAttributes, comuneros_tipos_docCreationAttributes> implements comuneros_tipos_docAttributes {
  id_comunero!: string;
  id_tipo_doc!: string;
  documento?: string;

  // comuneros_tipos_doc belongsTo comuneros via id_comunero
  id_comunero_comunero!: comuneros;
  getId_comunero_comunero!: Sequelize.BelongsToGetAssociationMixin<comuneros>;
  setId_comunero_comunero!: Sequelize.BelongsToSetAssociationMixin<comuneros, comunerosId>;
  createId_comunero_comunero!: Sequelize.BelongsToCreateAssociationMixin<comuneros>;
  // comuneros_tipos_doc belongsTo tipo_documentos via id_tipo_doc
  id_tipo_doc_tipo_documento!: tipo_documentos;
  getId_tipo_doc_tipo_documento!: Sequelize.BelongsToGetAssociationMixin<tipo_documentos>;
  setId_tipo_doc_tipo_documento!: Sequelize.BelongsToSetAssociationMixin<tipo_documentos, tipo_documentosId>;
  createId_tipo_doc_tipo_documento!: Sequelize.BelongsToCreateAssociationMixin<tipo_documentos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comuneros_tipos_doc {
    return comuneros_tipos_doc.init({
    id_comunero: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comuneros',
        key: 'id_comunero'
      }
    },
    id_tipo_doc: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tipo_documentos',
        key: 'id_tipo_doc'
      }
    },
    documento: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comuneros_tipos_doc',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comunero" },
          { name: "id_tipo_doc" },
        ]
      },
      {
        name: "fk_comuneros_has_tipo_documentos_tipo_documentos1_idx",
        using: "BTREE",
        fields: [
          { name: "id_tipo_doc" },
        ]
      },
      {
        name: "fk_comuneros_has_tipo_documentos_comuneros1_idx",
        using: "BTREE",
        fields: [
          { name: "id_comunero" },
        ]
      },
    ]
  });
  }
}
