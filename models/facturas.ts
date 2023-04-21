import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { cuotas_factura, cuotas_facturaId } from './cuotas_factura';
import type { forma_pago, forma_pagoId } from './forma_pago';

export interface facturasAttributes {
  id_factura: string;
  id_comunero?: string;
  fecha: string;
  hora: string;
  subtotal_fac: number;
  total_fac: number;
  descrip_fac?: string;
  estado_fac?: number;
  id_forma_pago: string;
}

export type facturasPk = "id_factura";
export type facturasId = facturas[facturasPk];
export type facturasOptionalAttributes = "id_comunero" | "descrip_fac" | "estado_fac" | "id_forma_pago";
export type facturasCreationAttributes = Optional<facturasAttributes, facturasOptionalAttributes>;

export class facturas extends Model<facturasAttributes, facturasCreationAttributes> implements facturasAttributes {
  id_factura!: string;
  id_comunero?: string;
  fecha!: string;
  hora!: string;
  subtotal_fac!: number;
  total_fac!: number;
  descrip_fac?: string;
  estado_fac?: number;
  id_forma_pago!: string;

  // facturas belongsTo comuneros via id_comunero
  id_comunero_comunero!: comuneros;
  getId_comunero_comunero!: Sequelize.BelongsToGetAssociationMixin<comuneros>;
  setId_comunero_comunero!: Sequelize.BelongsToSetAssociationMixin<comuneros, comunerosId>;
  createId_comunero_comunero!: Sequelize.BelongsToCreateAssociationMixin<comuneros>;
  // facturas hasMany cuotas_factura via id_factura
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
  // facturas belongsTo forma_pago via id_forma_pago
  id_forma_pago_forma_pago!: forma_pago;
  getId_forma_pago_forma_pago!: Sequelize.BelongsToGetAssociationMixin<forma_pago>;
  setId_forma_pago_forma_pago!: Sequelize.BelongsToSetAssociationMixin<forma_pago, forma_pagoId>;
  createId_forma_pago_forma_pago!: Sequelize.BelongsToCreateAssociationMixin<forma_pago>;

  static initModel(sequelize: Sequelize.Sequelize): typeof facturas {
    return facturas.init({
    id_factura: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    id_comunero: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'comuneros',
        key: 'id_comunero'
      }
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    subtotal_fac: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_fac: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    descrip_fac: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    estado_fac: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    id_forma_pago: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "1",
      references: {
        model: 'forma_pago',
        key: 'id_forma_pago'
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
          { name: "id_factura" },
        ]
      },
      {
        name: "fk_rel_comunero_fact",
        using: "BTREE",
        fields: [
          { name: "id_comunero" },
        ]
      },
      {
        name: "fk_facturas_forma_pago1_idx",
        using: "BTREE",
        fields: [
          { name: "id_forma_pago" },
        ]
      },
    ]
  });
  }
}
