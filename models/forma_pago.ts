import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { facturas, facturasId } from './facturas';

export interface forma_pagoAttributes {
  ID_FORMA_PAGO: number;
  ID_FACTURA?: number;
  FORMA_PAGO: string;
}

export type forma_pagoPk = "ID_FORMA_PAGO";
export type forma_pagoId = forma_pago[forma_pagoPk];
export type forma_pagoOptionalAttributes = "ID_FORMA_PAGO" | "ID_FACTURA";
export type forma_pagoCreationAttributes = Optional<forma_pagoAttributes, forma_pagoOptionalAttributes>;

export class forma_pago extends Model<forma_pagoAttributes, forma_pagoCreationAttributes> implements forma_pagoAttributes {
  ID_FORMA_PAGO!: number;
  ID_FACTURA?: number;
  FORMA_PAGO!: string;

  // forma_pago belongsTo facturas via ID_FACTURA
  ID_FACTURA_factura!: facturas;
  getID_FACTURA_factura!: Sequelize.BelongsToGetAssociationMixin<facturas>;
  setID_FACTURA_factura!: Sequelize.BelongsToSetAssociationMixin<facturas, facturasId>;
  createID_FACTURA_factura!: Sequelize.BelongsToCreateAssociationMixin<facturas>;

  static initModel(sequelize: Sequelize.Sequelize): typeof forma_pago {
    return forma_pago.init({
    ID_FORMA_PAGO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_FACTURA: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facturas',
        key: 'ID_FACTURA'
      }
    },
    FORMA_PAGO: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'forma_pago',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_FORMA_PAGO" },
        ]
      },
      {
        name: "FK_REL_FACT_FORM_PAGO",
        using: "BTREE",
        fields: [
          { name: "ID_FACTURA" },
        ]
      },
    ]
  });
  }
}
