import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { facturas, facturasId } from './facturas';

export interface forma_pagoAttributes {
  id_forma_pago: string;
  forma_pago: string;
}

export type forma_pagoPk = "id_forma_pago";
export type forma_pagoId = forma_pago[forma_pagoPk];
export type forma_pagoCreationAttributes = forma_pagoAttributes;

export class forma_pago extends Model<forma_pagoAttributes, forma_pagoCreationAttributes> implements forma_pagoAttributes {
  id_forma_pago!: string;
  forma_pago!: string;

  // forma_pago hasMany facturas via id_forma_pago
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
    id_forma_pago: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    forma_pago: {
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
          { name: "id_forma_pago" },
        ]
      },
    ]
  });
  }
}
