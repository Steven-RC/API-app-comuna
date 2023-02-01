import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { requisito_apr, requisito_aprId } from './requisito_apr';

export interface requisitosAttributes {
  ID_REQ: number;
  REQUISITO: string;
  OBSERVACION?: string;
  REQ_ESTADO?: number;
}

export type requisitosPk = "ID_REQ";
export type requisitosId = requisitos[requisitosPk];
export type requisitosOptionalAttributes = "ID_REQ" | "OBSERVACION" | "REQ_ESTADO";
export type requisitosCreationAttributes = Optional<requisitosAttributes, requisitosOptionalAttributes>;

export class requisitos extends Model<requisitosAttributes, requisitosCreationAttributes> implements requisitosAttributes {
  ID_REQ!: number;
  REQUISITO!: string;
  OBSERVACION?: string;
  REQ_ESTADO?: number;

  // requisitos hasMany requisito_apr via ID_REQ
  requisito_aprs!: requisito_apr[];
  getRequisito_aprs!: Sequelize.HasManyGetAssociationsMixin<requisito_apr>;
  setRequisito_aprs!: Sequelize.HasManySetAssociationsMixin<requisito_apr, requisito_aprId>;
  addRequisito_apr!: Sequelize.HasManyAddAssociationMixin<requisito_apr, requisito_aprId>;
  addRequisito_aprs!: Sequelize.HasManyAddAssociationsMixin<requisito_apr, requisito_aprId>;
  createRequisito_apr!: Sequelize.HasManyCreateAssociationMixin<requisito_apr>;
  removeRequisito_apr!: Sequelize.HasManyRemoveAssociationMixin<requisito_apr, requisito_aprId>;
  removeRequisito_aprs!: Sequelize.HasManyRemoveAssociationsMixin<requisito_apr, requisito_aprId>;
  hasRequisito_apr!: Sequelize.HasManyHasAssociationMixin<requisito_apr, requisito_aprId>;
  hasRequisito_aprs!: Sequelize.HasManyHasAssociationsMixin<requisito_apr, requisito_aprId>;
  countRequisito_aprs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof requisitos {
    return requisitos.init({
    ID_REQ: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    REQUISITO: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    OBSERVACION: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    REQ_ESTADO: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'requisitos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_REQ" },
        ]
      },
    ]
  });
  }
}
