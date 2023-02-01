import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cuota_anual, cuota_anualId } from './cuota_anual';

export interface anioAttributes {
  ID_ANIO: number;
  ANIO?: number;
}

export type anioPk = "ID_ANIO";
export type anioId = anio[anioPk];
export type anioOptionalAttributes = "ID_ANIO" | "ANIO";
export type anioCreationAttributes = Optional<anioAttributes, anioOptionalAttributes>;

export class anio extends Model<anioAttributes, anioCreationAttributes> implements anioAttributes {
  ID_ANIO!: number;
  ANIO?: number;

  // anio hasMany cuota_anual via ID_ANIO
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
    ID_ANIO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ANIO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "AÑO_UNIQUE"
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
          { name: "ID_ANIO" },
        ]
      },
      {
        name: "ID_AÑO_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_ANIO" },
        ]
      },
      {
        name: "AÑO_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ANIO" },
        ]
      },
    ]
  });
  }
}
