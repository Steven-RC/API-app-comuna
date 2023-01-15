import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { documentos, documentosCreationAttributes, documentosId } from './documentos';

export interface tipo_documentosAttributes {
  ID_TIPO_DOC: number;
  TIPO_DOC: string;
  ESTADO_DOC?: number;
}

export type tipo_documentosPk = "ID_TIPO_DOC";
export type tipo_documentosId = tipo_documentos[tipo_documentosPk];
export type tipo_documentosOptionalAttributes = "ID_TIPO_DOC" | "ESTADO_DOC";
export type tipo_documentosCreationAttributes = Optional<tipo_documentosAttributes, tipo_documentosOptionalAttributes>;

export class tipo_documentos extends Model<tipo_documentosAttributes, tipo_documentosCreationAttributes> implements tipo_documentosAttributes {
  ID_TIPO_DOC!: number;
  TIPO_DOC!: string;
  ESTADO_DOC?: number;

  // tipo_documentos hasOne documentos via ID_TIPO_DOC
  documento!: documentos;
  getDocumento!: Sequelize.HasOneGetAssociationMixin<documentos>;
  setDocumento!: Sequelize.HasOneSetAssociationMixin<documentos, documentosId>;
  createDocumento!: Sequelize.HasOneCreateAssociationMixin<documentos>;

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
