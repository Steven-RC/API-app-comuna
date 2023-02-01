import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { personas, personasId } from './personas';
import type { requisitos, requisitosId } from './requisitos';

export interface requisito_aprAttributes {
  ID_REQ_AP: number;
  FECHA_AP: string;
  OBSERVACION?: string;
  ID_PERSONA: number;
  ID_REQ: number;
}

export type requisito_aprPk = "ID_REQ_AP" | "ID_REQ";
export type requisito_aprId = requisito_apr[requisito_aprPk];
export type requisito_aprOptionalAttributes = "ID_REQ_AP" | "OBSERVACION";
export type requisito_aprCreationAttributes = Optional<requisito_aprAttributes, requisito_aprOptionalAttributes>;

export class requisito_apr extends Model<requisito_aprAttributes, requisito_aprCreationAttributes> implements requisito_aprAttributes {
  ID_REQ_AP!: number;
  FECHA_AP!: string;
  OBSERVACION?: string;
  ID_PERSONA!: number;
  ID_REQ!: number;

  // requisito_apr belongsTo personas via ID_PERSONA
  ID_PERSONA_persona!: personas;
  getID_PERSONA_persona!: Sequelize.BelongsToGetAssociationMixin<personas>;
  setID_PERSONA_persona!: Sequelize.BelongsToSetAssociationMixin<personas, personasId>;
  createID_PERSONA_persona!: Sequelize.BelongsToCreateAssociationMixin<personas>;
  // requisito_apr belongsTo requisitos via ID_REQ
  ID_REQ_requisito!: requisitos;
  getID_REQ_requisito!: Sequelize.BelongsToGetAssociationMixin<requisitos>;
  setID_REQ_requisito!: Sequelize.BelongsToSetAssociationMixin<requisitos, requisitosId>;
  createID_REQ_requisito!: Sequelize.BelongsToCreateAssociationMixin<requisitos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof requisito_apr {
    return requisito_apr.init({
    ID_REQ_AP: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FECHA_AP: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    OBSERVACION: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: "Ninguna"
    },
    ID_PERSONA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personas',
        key: 'ID_PERSONA'
      }
    },
    ID_REQ: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'requisitos',
        key: 'ID_REQ'
      }
    }
  }, {
    sequelize,
    tableName: 'requisito_apr',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_REQ_AP" },
          { name: "ID_REQ" },
        ]
      },
      {
        name: "fk_requisito_apr_personas1_idx",
        using: "BTREE",
        fields: [
          { name: "ID_PERSONA" },
        ]
      },
      {
        name: "fk_requisito_apr_requisitos1_idx",
        using: "BTREE",
        fields: [
          { name: "ID_REQ" },
        ]
      },
    ]
  });
  }
}
