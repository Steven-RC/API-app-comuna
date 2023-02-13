import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { tipo_documentos, tipo_documentosId } from './tipo_documentos';

export interface comuneros_tipos_docAttributes {
  ID_COMUNERO: number;
  ID_TIPO_DOC: number;
  DOCUMENTO?: string;
}

export type comuneros_tipos_docPk = "ID_COMUNERO" | "ID_TIPO_DOC";
export type comuneros_tipos_docId = comuneros_tipos_doc[comuneros_tipos_docPk];
export type comuneros_tipos_docOptionalAttributes = "DOCUMENTO";
export type comuneros_tipos_docCreationAttributes = Optional<comuneros_tipos_docAttributes, comuneros_tipos_docOptionalAttributes>;

export class comuneros_tipos_doc extends Model<comuneros_tipos_docAttributes, comuneros_tipos_docCreationAttributes> implements comuneros_tipos_docAttributes {
  ID_COMUNERO!: number;
  ID_TIPO_DOC!: number;
  DOCUMENTO?: string;

  // comuneros_tipos_doc belongsTo comuneros via ID_COMUNERO
  ID_COMUNERO_comunero!: comuneros;
  getID_COMUNERO_comunero!: Sequelize.BelongsToGetAssociationMixin<comuneros>;
  setID_COMUNERO_comunero!: Sequelize.BelongsToSetAssociationMixin<comuneros, comunerosId>;
  createID_COMUNERO_comunero!: Sequelize.BelongsToCreateAssociationMixin<comuneros>;
  // comuneros_tipos_doc belongsTo tipo_documentos via ID_TIPO_DOC
  ID_TIPO_DOC_tipo_documento!: tipo_documentos;
  getID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToGetAssociationMixin<tipo_documentos>;
  setID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToSetAssociationMixin<tipo_documentos, tipo_documentosId>;
  createID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToCreateAssociationMixin<tipo_documentos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comuneros_tipos_doc {
    return comuneros_tipos_doc.init({
    ID_COMUNERO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comuneros',
        key: 'ID_COMUNERO'
      }
    },
    ID_TIPO_DOC: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tipo_documentos',
        key: 'ID_TIPO_DOC'
      }
    },
    DOCUMENTO: {
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
          { name: "ID_COMUNERO" },
          { name: "ID_TIPO_DOC" },
        ]
      },
      {
        name: "fk_comuneros_has_tipo_documentos_tipo_documentos1_idx",
        using: "BTREE",
        fields: [
          { name: "ID_TIPO_DOC" },
        ]
      },
      {
        name: "fk_comuneros_has_tipo_documentos_comuneros1_idx",
        using: "BTREE",
        fields: [
          { name: "ID_COMUNERO" },
        ]
      },
    ]
  });
  }
}
