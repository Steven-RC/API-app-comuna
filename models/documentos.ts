import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tipo_documentos, tipo_documentosId } from './tipo_documentos';

export interface documentosAttributes {
  ID_DOCUMENTO: number;
  DOCUMENTO: string;
  ID_TIPO_DOC: number;
}

export type documentosPk = "ID_DOCUMENTO";
export type documentosId = documentos[documentosPk];
export type documentosOptionalAttributes = "ID_DOCUMENTO";
export type documentosCreationAttributes = Optional<documentosAttributes, documentosOptionalAttributes>;

export class documentos extends Model<documentosAttributes, documentosCreationAttributes> implements documentosAttributes {
  ID_DOCUMENTO!: number;
  DOCUMENTO!: string;
  ID_TIPO_DOC!: number;

  // documentos belongsTo tipo_documentos via ID_TIPO_DOC
  ID_TIPO_DOC_tipo_documento!: tipo_documentos;
  getID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToGetAssociationMixin<tipo_documentos>;
  setID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToSetAssociationMixin<tipo_documentos, tipo_documentosId>;
  createID_TIPO_DOC_tipo_documento!: Sequelize.BelongsToCreateAssociationMixin<tipo_documentos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof documentos {
    return documentos.init({
    ID_DOCUMENTO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    DOCUMENTO: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ID_TIPO_DOC: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_documentos',
        key: 'ID_TIPO_DOC'
      }
    }
  }, {
    sequelize,
    tableName: 'documentos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_DOCUMENTO" },
        ]
      },
      {
        name: "fk_documentos_tipo_documentos1_idx",
        using: "BTREE",
        fields: [
          { name: "ID_TIPO_DOC" },
        ]
      },
    ]
  });
  }
}
