import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { facturas, facturasId } from './facturas';

export interface forma_pagoAttributes {
  ID_FORMA_PAGO: number;
  FORMA_PAGO: string;
}

export type forma_pagoPk = "ID_FORMA_PAGO";
export type forma_pagoId = forma_pago[forma_pagoPk];
export type forma_pagoOptionalAttributes = "ID_FORMA_PAGO";
export type forma_pagoCreationAttributes = Optional<forma_pagoAttributes, forma_pagoOptionalAttributes>;

export class forma_pago extends Model<forma_pagoAttributes, forma_pagoCreationAttributes> implements forma_pagoAttributes {
  ID_FORMA_PAGO!: number;
  FORMA_PAGO!: string;

  // forma_pago hasMany facturas via ID_FORMA_PAGO
  facturas!: facturas[];
  getFacturas!: Sequelize.HasManyGetAssociationsMixin<facturas>;
  setFacturas!: Sequelize.HasManySetAssociationsMixin<facturas, facturasId>;
  addFactura!: Sequelize.HasManyAddAssociationMixin<facturas, facturasId>;
  addFacturas!: Sequelize.HasManyAddAssociationsMixin<facturas, facturasId>;
  createFactura!: Sequelize.HasManyCreateAssociationMixin<facturas>;
  removeFactura!: Sequelize.HasManyRemoveAssociationMixin<facturas, facturasId>;
  removeFacturas!: Sequelize.HasManyRemoveAssociationsMixin<facturas, facturasId>;
  hasFactura!: Sequelize.HasManyHasAssociationMixin<facturas, facturasId>;
  hasFacturas!: Sequelize.HasManyHasAssociationsMixin<facturas, facturasId>;
  countFacturas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof forma_pago {
    return forma_pago.init({
    ID_FORMA_PAGO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    ]
  });
  }
}
