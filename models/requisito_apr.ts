import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { personas, personasId } from './personas';
import type { requisitos, requisitosId } from './requisitos';

export interface requisito_aprAttributes {
  id_req_ap: string;
  fecha_ap: string;
  observacion?: string;
  id_persona: string;
  id_req: string;
}

export type requisito_aprPk = "id_req_ap" | "id_req";
export type requisito_aprId = requisito_apr[requisito_aprPk];
export type requisito_aprOptionalAttributes = "observacion";
export type requisito_aprCreationAttributes = Optional<requisito_aprAttributes, requisito_aprOptionalAttributes>;

export class requisito_apr extends Model<requisito_aprAttributes, requisito_aprCreationAttributes> implements requisito_aprAttributes {
  id_req_ap!: string;
  fecha_ap!: string;
  observacion?: string;
  id_persona!: string;
  id_req!: string;

  // requisito_apr belongsTo personas via id_persona
  id_persona_persona!: personas;
  getId_persona_persona!: Sequelize.BelongsToGetAssociationMixin<personas>;
  setId_persona_persona!: Sequelize.BelongsToSetAssociationMixin<personas, personasId>;
  createId_persona_persona!: Sequelize.BelongsToCreateAssociationMixin<personas>;
  // requisito_apr belongsTo requisitos via id_req
  id_req_requisito!: requisitos;
  getId_req_requisito!: Sequelize.BelongsToGetAssociationMixin<requisitos>;
  setId_req_requisito!: Sequelize.BelongsToSetAssociationMixin<requisitos, requisitosId>;
  createId_req_requisito!: Sequelize.BelongsToCreateAssociationMixin<requisitos>;

  static initModel(sequelize: Sequelize.Sequelize): typeof requisito_apr {
    return requisito_apr.init({
    id_req_ap: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    fecha_ap: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    observacion: {
      type: DataTypes.STRING(150),
      allowNull: true,
      defaultValue: "ninguna"
    },
    id_persona: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'personas',
        key: 'id_persona'
      }
    },
    id_req: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'requisitos',
        key: 'id_req'
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
          { name: "id_req_ap" },
          { name: "id_req" },
        ]
      },
      {
        name: "fk_requisito_apr_personas1_idx",
        using: "BTREE",
        fields: [
          { name: "id_persona" },
        ]
      },
      {
        name: "fk_requisito_apr_requisitos1_idx",
        using: "BTREE",
        fields: [
          { name: "id_req" },
        ]
      },
    ]
  });
  }
}
