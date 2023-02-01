import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { anio, anioId } from './anio';
import type { cuotas_factura, cuotas_facturaId } from './cuotas_factura';
import type { facturas, facturasId } from './facturas';

export interface cuota_anualAttributes {
  ID_CUOTA: number;
  NOM_CUOTA: string;
  VALOR_CUOTA: number;
  ESTADO_CUOTA: number;
  ID_ANIO: number;
  DESCRIPCION?: string;
}

export type cuota_anualPk = "ID_CUOTA" | "ID_ANIO";
export type cuota_anualId = cuota_anual[cuota_anualPk];
export type cuota_anualOptionalAttributes = "ID_CUOTA" | "ESTADO_CUOTA" | "DESCRIPCION";
export type cuota_anualCreationAttributes = Optional<cuota_anualAttributes, cuota_anualOptionalAttributes>;

export class cuota_anual extends Model<cuota_anualAttributes, cuota_anualCreationAttributes> implements cuota_anualAttributes {
  ID_CUOTA!: number;
  NOM_CUOTA!: string;
  VALOR_CUOTA!: number;
  ESTADO_CUOTA!: number;
  ID_ANIO!: number;
  DESCRIPCION?: string;

  // cuota_anual belongsTo anio via ID_ANIO
  ID_ANIO_anio!: anio;
  getID_ANIO_anio!: Sequelize.BelongsToGetAssociationMixin<anio>;
  setID_ANIO_anio!: Sequelize.BelongsToSetAssociationMixin<anio, anioId>;
  createID_ANIO_anio!: Sequelize.BelongsToCreateAssociationMixin<anio>;
  // cuota_anual hasMany cuotas_factura via ID_CUOTA
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
  // cuota_anual belongsToMany facturas via ID_CUOTA and ID_FACTURA
  ID_FACTURA_facturas!: facturas[];
  getID_FACTURA_facturas!: Sequelize.BelongsToManyGetAssociationsMixin<facturas>;
  setID_FACTURA_facturas!: Sequelize.BelongsToManySetAssociationsMixin<facturas, facturasId>;
  addID_FACTURA_factura!: Sequelize.BelongsToManyAddAssociationMixin<facturas, facturasId>;
  addID_FACTURA_facturas!: Sequelize.BelongsToManyAddAssociationsMixin<facturas, facturasId>;
  createID_FACTURA_factura!: Sequelize.BelongsToManyCreateAssociationMixin<facturas>;
  removeID_FACTURA_factura!: Sequelize.BelongsToManyRemoveAssociationMixin<facturas, facturasId>;
  removeID_FACTURA_facturas!: Sequelize.BelongsToManyRemoveAssociationsMixin<facturas, facturasId>;
  hasID_FACTURA_factura!: Sequelize.BelongsToManyHasAssociationMixin<facturas, facturasId>;
  hasID_FACTURA_facturas!: Sequelize.BelongsToManyHasAssociationsMixin<facturas, facturasId>;
  countID_FACTURA_facturas!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof cuota_anual {
    return cuota_anual.init({
    ID_CUOTA: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOM_CUOTA: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    VALOR_CUOTA: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ESTADO_CUOTA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    ID_ANIO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'anio',
        key: 'ID_ANIO'
      }
    },
    DESCRIPCION: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cuota_anual',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_CUOTA" },
          { name: "ID_ANIO" },
        ]
      },
      {
        name: "fk_cuota_anual_table11_idx",
        using: "BTREE",
        fields: [
          { name: "ID_ANIO" },
        ]
      },
    ]
  });
  }
}
