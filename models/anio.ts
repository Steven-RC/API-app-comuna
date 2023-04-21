import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cuota_anual, cuota_anualId } from './cuota_anual';

export interface anioAttributes {
  id_anio: string;
  anio?: string;
}

export type anioPk = "id_anio";
export type anioId = anio[anioPk];
export type anioOptionalAttributes = "anio";
export type anioCreationAttributes = Optional<anioAttributes, anioOptionalAttributes>;

export class anio extends Model<anioAttributes, anioCreationAttributes> implements anioAttributes {
  id_anio!: string;
  anio?: string;

  // anio hasMany cuota_anual via id_anio
  cuota_anuals!: cuota_anual[];
  getCuota_anuals!: Sequelize.HasManyGetAssociationsMixin<cuota_anual>;
  setCuota_anuals!: Sequelize.HasManySetAssociationsMixin<cuota_anual, cuota_anualId>;
  addCuota_anual!: Sequelize.HasManyAddAssociationMixin<cuota_anual, cuota_anualId>;
  addCuota_anuals!: Sequelize.HasManyAddAssociationsMixin<cuota_anual, cuota_anualId>;
  createCuota_anual!: Sequelize.HasManyCreateAssociationMixin<cuota_anual>;
  removeCuota_anual!: Sequelize.HasManyRemoveAssociationMixin<cuota_anual, cuota_anualId>;
  removeCuota_anuals!: Sequelize.HasManyRemoveAssociationsMixin<cuota_anual, cuota_anualId>;
  hasCuota_anual!: Sequelize.HasManyHasAssociationMixin<cuota_anual, cuota_anualId>;
  hasCuota_anuals!: Sequelize.HasManyHasAssociationsMixin<cuota_anual, cuota_anualId>;
  countCuota_anuals!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof anio {
    return anio.init({
    id_anio: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    anio: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "año_unique"
    }
  }, {
    sequelize,
    tableName: 'anio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_anio" },
        ]
      },
      {
        name: "id_año_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_anio" },
        ]
      },
      {
        name: "año_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "anio" },
        ]
      },
    ]
  });
  }
}
