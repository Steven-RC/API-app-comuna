import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { tipo_documentos, tipo_documentosId } from './tipo_documentos';

export interface documentosAttributes {
  ID_DOCUMENTO: number;
  ID_COMUNERO?: number;
  ID_TIPO_DOC?: number;
  FILE: any;
}

export type documentosPk = "ID_DOCUMENTO";
export type documentosId = documentos[documentosPk];
export type documentosOptionalAttributes = "ID_DOCUMENTO" | "ID_COMUNERO" | "ID_TIPO_DOC";
export type documentosCreationAttributes = Optional<documentosAttributes, documentosOptionalAttributes>;

export class documentos extends Model<documentosAttributes, documentosCreationAttributes> implements documentosAttributes {
  ID_DOCUMENTO!: number;
  ID_COMUNERO?: number;
  ID_TIPO_DOC?: number;
  FILE!: any;

  // documentos belongsTo comuneros via ID_COMUNERO
  ID_COMUNERO_comunero!: comuneros;
  getID_COMUNERO_comunero!: Sequelize.BelongsToGetAssociationMixin<comuneros>;
  setID_COMUNERO_comunero!: Sequelize.BelongsToSetAssociationMixin<comuneros, comunerosId>;
  createID_COMUNERO_comunero!: Sequelize.BelongsToCreateAssociationMixin<comuneros>;
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
    ID_COMUNERO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'comuneros',
        key: 'ID_COMUNERO'
      }
    },
    ID_TIPO_DOC: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_documentos',
        key: 'ID_TIPO_DOC'
      },
      unique: "FK_REL_TIP_DOC_DOCUMENTOS"
    },
    FILE: {
      type: DataTypes.BLOB,
      allowNull: false
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
        name: "ID_TIPO_DOC",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_TIPO_DOC" },
        ]
      },
      {
        name: "FK_REL_COM_DOCUMENTOS",
        using: "BTREE",
        fields: [
          { name: "ID_COMUNERO" },
        ]
      },
    ]
  });
  }
}
