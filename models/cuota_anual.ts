import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { anio, anioId } from './anio';
import type { cuotas_factura, cuotas_facturaId } from './cuotas_factura';

export interface cuota_anualAttributes {
  id_cuota: string;
  nom_cuota: string;
  valor_cuota: number;
  estado_cuota: number;
  id_anio: string;
  descripcion?: string;
}

export type cuota_anualPk = "id_cuota" | "id_anio";
export type cuota_anualId = cuota_anual[cuota_anualPk];
export type cuota_anualOptionalAttributes = "estado_cuota" | "descripcion";
export type cuota_anualCreationAttributes = Optional<cuota_anualAttributes, cuota_anualOptionalAttributes>;

export class cuota_anual extends Model<cuota_anualAttributes, cuota_anualCreationAttributes> implements cuota_anualAttributes {
  id_cuota!: string;
  nom_cuota!: string;
  valor_cuota!: number;
  estado_cuota!: number;
  id_anio!: string;
  descripcion?: string;

  // cuota_anual belongsTo anio via id_anio
  id_anio_anio!: anio;
  getId_anio_anio!: Sequelize.BelongsToGetAssociationMixin<anio>;
  setId_anio_anio!: Sequelize.BelongsToSetAssociationMixin<anio, anioId>;
  createId_anio_anio!: Sequelize.BelongsToCreateAssociationMixin<anio>;
  // cuota_anual hasMany cuotas_factura via id_cuota
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
  // cuota_anual hasMany cuotas_factura via id_anio
  id_anio_cuotas_facturas!: cuotas_factura[];
  getId_anio_cuotas_facturas!: Sequelize.HasManyGetAssociationsMixin<cuotas_factura>;
  setId_anio_cuotas_facturas!: Sequelize.HasManySetAssociationsMixin<cuotas_factura, cuotas_facturaId>;
  addId_anio_cuotas_factura!: Sequelize.HasManyAddAssociationMixin<cuotas_factura, cuotas_facturaId>;
  addId_anio_cuotas_facturas!: Sequelize.HasManyAddAssociationsMixin<cuotas_factura, cuotas_facturaId>;
  createId_anio_cuotas_factura!: Sequelize.HasManyCreateAssociationMixin<cuotas_factura>;
  removeId_anio_cuotas_factura!: Sequelize.HasManyRemoveAssociationMixin<cuotas_factura, cuotas_facturaId>;
  removeId_anio_cuotas_facturas!: Sequelize.HasManyRemoveAssociationsMixin<cuotas_factura, cuotas_facturaId>;
  hasId_anio_cuotas_factura!: Sequelize.HasManyHasAssociationMixin<cuotas_factura, cuotas_facturaId>;
  hasId_anio_cuotas_facturas!: Sequelize.HasManyHasAssociationsMixin<cuotas_factura, cuotas_facturaId>;
  countId_anio_cuotas_facturas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof cuota_anual {
    return cuota_anual.init({
    id_cuota: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    nom_cuota: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    valor_cuota: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    estado_cuota: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    id_anio: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'anio',
        key: 'id_anio'
      }
    },
    descripcion: {
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
          { name: "id_cuota" },
          { name: "id_anio" },
        ]
      },
      {
        name: "fk_cuota_anual_table11_idx",
        using: "BTREE",
        fields: [
          { name: "id_anio" },
        ]
      },
    ]
  });
  }
}
