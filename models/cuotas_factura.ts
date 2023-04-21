import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cuota_anual, cuota_anualId } from './cuota_anual';
import type { facturas, facturasId } from './facturas';

export interface cuotas_facturaAttributes {
  id_factura: string;
  id_cuota: string;
  id_anio: string;
}

export type cuotas_facturaPk = "id_factura" | "id_cuota" | "id_anio";
export type cuotas_facturaId = cuotas_factura[cuotas_facturaPk];
export type cuotas_facturaOptionalAttributes = "id_anio";
export type cuotas_facturaCreationAttributes = Optional<cuotas_facturaAttributes, cuotas_facturaOptionalAttributes>;

export class cuotas_factura extends Model<cuotas_facturaAttributes, cuotas_facturaCreationAttributes> implements cuotas_facturaAttributes {
  id_factura!: string;
  id_cuota!: string;
  id_anio!: string;

  // cuotas_factura belongsTo cuota_anual via id_cuota
  id_cuota_cuota_anual!: cuota_anual;
  getId_cuota_cuota_anual!: Sequelize.BelongsToGetAssociationMixin<cuota_anual>;
  setId_cuota_cuota_anual!: Sequelize.BelongsToSetAssociationMixin<cuota_anual, cuota_anualId>;
  createId_cuota_cuota_anual!: Sequelize.BelongsToCreateAssociationMixin<cuota_anual>;
  // cuotas_factura belongsTo cuota_anual via id_anio
  id_anio_cuota_anual!: cuota_anual;
  getId_anio_cuota_anual!: Sequelize.BelongsToGetAssociationMixin<cuota_anual>;
  setId_anio_cuota_anual!: Sequelize.BelongsToSetAssociationMixin<cuota_anual, cuota_anualId>;
  createId_anio_cuota_anual!: Sequelize.BelongsToCreateAssociationMixin<cuota_anual>;
  // cuotas_factura belongsTo facturas via id_factura
  id_factura_factura!: facturas;
  getId_factura_factura!: Sequelize.BelongsToGetAssociationMixin<facturas>;
  setId_factura_factura!: Sequelize.BelongsToSetAssociationMixin<facturas, facturasId>;
  createId_factura_factura!: Sequelize.BelongsToCreateAssociationMixin<facturas>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cuotas_factura {
    return cuotas_factura.init({
    id_factura: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'facturas',
        key: 'id_factura'
      }
    },
    id_cuota: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cuota_anual',
        key: 'id_cuota'
      }
    },
    id_anio: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "1",
      primaryKey: true,
      references: {
        model: 'cuota_anual',
        key: 'id_anio'
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
          { name: "id_factura" },
          { name: "id_cuota" },
          { name: "id_anio" },
        ]
      },
      {
        name: "fk_facturas_has_cuota_anual_cuota_anual1_idx",
        using: "BTREE",
        fields: [
          { name: "id_cuota" },
          { name: "id_anio" },
        ]
      },
      {
        name: "fk_facturas_has_cuota_anual_facturas1_idx",
        using: "BTREE",
        fields: [
          { name: "id_factura" },
        ]
      },
    ]
  });
  }
}
