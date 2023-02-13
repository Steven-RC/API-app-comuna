import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { cuotas_factura, cuotas_facturaId } from './cuotas_factura';
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
  ID_FORMA_PAGO: number;
}

export type facturasPk = "ID_FACTURA";
export type facturasId = facturas[facturasPk];
export type facturasOptionalAttributes = "ID_FACTURA" | "ID_COMUNERO" | "DESCRIP_FAC" | "ESTADO_FAC" | "ID_FORMA_PAGO";
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
  ID_FORMA_PAGO!: number;

  // facturas belongsTo comuneros via ID_COMUNERO
  ID_COMUNERO_comunero!: comuneros;
  getID_COMUNERO_comunero!: Sequelize.BelongsToGetAssociationMixin<comuneros>;
  setID_COMUNERO_comunero!: Sequelize.BelongsToSetAssociationMixin<comuneros, comunerosId>;
  createID_COMUNERO_comunero!: Sequelize.BelongsToCreateAssociationMixin<comuneros>;
  // facturas hasMany cuotas_factura via ID_FACTURA
  cuotas_facturas!: cuotas_factura[];
  getCuotas_facturas!: Sequelize.HasManyGetAssociationsMixin<cuotas_factura>;
  setCuotas_facturas!: Sequelize.HasManySetAssociationsMixin<cuotas_factura, cuotas_facturaId>;
  addCuotas_factura!: Sequelize.HasManyAddAssociationMixin<cuotas_factura, cuotas_facturaId>;
  addCuotas_facturas!: Sequelize.HasManyAddAssociationsMixin<cuotas_factura, cuotas_facturaId>;
  createCuotas_factura!: Sequelize.HasManyCreateAssociationMixin<cuotas_factura>;
  removeCuotas_factura!: Sequelize.HasManyRemoveAssociationMixin<cuotas_factura, cuotas_facturaId>;
  removeCuotas_facturas!: Sequelize.HasManyRemoveAssociationsMixin<cuotas_factura, cuotas_facturaId>;
  hasCuotas_factura!: Sequelize.HasManyHasAssociationMixin<cuotas_factura, cuotas_facturaId>;
  hasCuotas_facturas!: Sequelize.HasManyHasAssociationsMixin<cuotas_factura, cuotas_facturaId>;
  countCuotas_facturas!: Sequelize.HasManyCountAssociationsMixin;
  // facturas belongsTo forma_pago via ID_FORMA_PAGO
  ID_FORMA_PAGO_forma_pago!: forma_pago;
  getID_FORMA_PAGO_forma_pago!: Sequelize.BelongsToGetAssociationMixin<forma_pago>;
  setID_FORMA_PAGO_forma_pago!: Sequelize.BelongsToSetAssociationMixin<forma_pago, forma_pagoId>;
  createID_FORMA_PAGO_forma_pago!: Sequelize.BelongsToCreateAssociationMixin<forma_pago>;

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
    },
    ID_FORMA_PAGO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'forma_pago',
        key: 'ID_FORMA_PAGO'
      }
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
      {
        name: "fk_facturas_forma_pago1_idx",
        using: "BTREE",
        fields: [
          { name: "ID_FORMA_PAGO" },
        ]
      },
    ]
  });
  }
}
