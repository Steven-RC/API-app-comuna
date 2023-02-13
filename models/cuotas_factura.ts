import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cuota_anual, cuota_anualId } from './cuota_anual';
import type { facturas, facturasId } from './facturas';

export interface cuotas_facturaAttributes {
  ID_FACTURA: number;
  ID_CUOTA: number;
  ID_ANIO: number;
}

export type cuotas_facturaPk = "ID_FACTURA" | "ID_CUOTA" | "ID_ANIO";
export type cuotas_facturaId = cuotas_factura[cuotas_facturaPk];
export type cuotas_facturaOptionalAttributes = "ID_ANIO";
export type cuotas_facturaCreationAttributes = Optional<cuotas_facturaAttributes, cuotas_facturaOptionalAttributes>;

export class cuotas_factura extends Model<cuotas_facturaAttributes, cuotas_facturaCreationAttributes> implements cuotas_facturaAttributes {
  ID_FACTURA!: number;
  ID_CUOTA!: number;
  ID_ANIO!: number;

  // cuotas_factura belongsTo cuota_anual via ID_CUOTA
  ID_CUOTA_cuota_anual!: cuota_anual;
  getID_CUOTA_cuota_anual!: Sequelize.BelongsToGetAssociationMixin<cuota_anual>;
  setID_CUOTA_cuota_anual!: Sequelize.BelongsToSetAssociationMixin<cuota_anual, cuota_anualId>;
  createID_CUOTA_cuota_anual!: Sequelize.BelongsToCreateAssociationMixin<cuota_anual>;
  // cuotas_factura belongsTo cuota_anual via ID_ANIO
  ID_ANIO_cuota_anual!: cuota_anual;
  getID_ANIO_cuota_anual!: Sequelize.BelongsToGetAssociationMixin<cuota_anual>;
  setID_ANIO_cuota_anual!: Sequelize.BelongsToSetAssociationMixin<cuota_anual, cuota_anualId>;
  createID_ANIO_cuota_anual!: Sequelize.BelongsToCreateAssociationMixin<cuota_anual>;
  // cuotas_factura belongsTo facturas via ID_FACTURA
  ID_FACTURA_factura!: facturas;
  getID_FACTURA_factura!: Sequelize.BelongsToGetAssociationMixin<facturas>;
  setID_FACTURA_factura!: Sequelize.BelongsToSetAssociationMixin<facturas, facturasId>;
  createID_FACTURA_factura!: Sequelize.BelongsToCreateAssociationMixin<facturas>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cuotas_factura {
    return cuotas_factura.init({
    ID_FACTURA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'facturas',
        key: 'ID_FACTURA'
      }
    },
    ID_CUOTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cuota_anual',
        key: 'ID_CUOTA'
      }
    },
    ID_ANIO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      primaryKey: true,
      references: {
        model: 'cuota_anual',
        key: 'ID_ANIO'
      }
    }
  }, {
    sequelize,
    tableName: 'cuotas_factura',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_FACTURA" },
          { name: "ID_CUOTA" },
          { name: "ID_ANIO" },
        ]
      },
      {
        name: "fk_facturas_has_cuota_anual_cuota_anual1_idx",
        using: "BTREE",
        fields: [
          { name: "ID_CUOTA" },
          { name: "ID_ANIO" },
        ]
      },
      {
        name: "fk_facturas_has_cuota_anual_facturas1_idx",
        using: "BTREE",
        fields: [
          { name: "ID_FACTURA" },
        ]
      },
    ]
  });
  }
}
