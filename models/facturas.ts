import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { forma_pago, forma_pagoId } from './forma_pago';

export interface facturasAttributes {
  ID_FACTURA: number;
  ID_COMUNERO?: number;
  FECHA: string;
  HORA: string;
  SUBTOTAL_FAC: number;
  TOTAL_FAC: number;
  DESCRIP_FAC?: string;
  ESTADO_FAC?: number;
}

export type facturasPk = "ID_FACTURA";
export type facturasId = facturas[facturasPk];
export type facturasOptionalAttributes = "ID_FACTURA" | "ID_COMUNERO" | "DESCRIP_FAC" | "ESTADO_FAC";
export type facturasCreationAttributes = Optional<facturasAttributes, facturasOptionalAttributes>;

export class facturas extends Model<facturasAttributes, facturasCreationAttributes> implements facturasAttributes {
  ID_FACTURA!: number;
  ID_COMUNERO?: number;
  FECHA!: string;
  HORA!: string;
  SUBTOTAL_FAC!: number;
  TOTAL_FAC!: number;
  DESCRIP_FAC?: string;
  ESTADO_FAC?: number;

  // facturas belongsTo comuneros via ID_COMUNERO
  ID_COMUNERO_comunero!: comuneros;
  getID_COMUNERO_comunero!: Sequelize.BelongsToGetAssociationMixin<comuneros>;
  setID_COMUNERO_comunero!: Sequelize.BelongsToSetAssociationMixin<comuneros, comunerosId>;
  createID_COMUNERO_comunero!: Sequelize.BelongsToCreateAssociationMixin<comuneros>;
  // facturas hasMany forma_pago via ID_FACTURA
  forma_pagos!: forma_pago[];
  getForma_pagos!: Sequelize.HasManyGetAssociationsMixin<forma_pago>;
  setForma_pagos!: Sequelize.HasManySetAssociationsMixin<forma_pago, forma_pagoId>;
  addForma_pago!: Sequelize.HasManyAddAssociationMixin<forma_pago, forma_pagoId>;
  addForma_pagos!: Sequelize.HasManyAddAssociationsMixin<forma_pago, forma_pagoId>;
  createForma_pago!: Sequelize.HasManyCreateAssociationMixin<forma_pago>;
  removeForma_pago!: Sequelize.HasManyRemoveAssociationMixin<forma_pago, forma_pagoId>;
  removeForma_pagos!: Sequelize.HasManyRemoveAssociationsMixin<forma_pago, forma_pagoId>;
  hasForma_pago!: Sequelize.HasManyHasAssociationMixin<forma_pago, forma_pagoId>;
  hasForma_pagos!: Sequelize.HasManyHasAssociationsMixin<forma_pago, forma_pagoId>;
  countForma_pagos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof facturas {
    return facturas.init({
    ID_FACTURA: {
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
    FECHA: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    HORA: {
      type: DataTypes.TIME,
      allowNull: false
    },
    SUBTOTAL_FAC: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TOTAL_FAC: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    DESCRIP_FAC: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ESTADO_FAC: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'facturas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_FACTURA" },
        ]
      },
      {
        name: "FK_REL_COMUNERO_FACT",
        using: "BTREE",
        fields: [
          { name: "ID_COMUNERO" },
        ]
      },
    ]
  });
  }
}
