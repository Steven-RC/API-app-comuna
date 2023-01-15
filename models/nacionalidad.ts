import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { personas, personasId } from './personas';

export interface nacionalidadAttributes {
  ID_NACIONALIDAD: number;
  NACIONALIDAD?: string;
  ESTADO_NAC?: number;
}

export type nacionalidadPk = "ID_NACIONALIDAD";
export type nacionalidadId = nacionalidad[nacionalidadPk];
export type nacionalidadOptionalAttributes = "ID_NACIONALIDAD" | "NACIONALIDAD" | "ESTADO_NAC";
export type nacionalidadCreationAttributes = Optional<nacionalidadAttributes, nacionalidadOptionalAttributes>;

export class nacionalidad extends Model<nacionalidadAttributes, nacionalidadCreationAttributes> implements nacionalidadAttributes {
  ID_NACIONALIDAD!: number;
  NACIONALIDAD?: string;
  ESTADO_NAC?: number;

  // nacionalidad hasMany personas via ID_NACIONALIDAD
  personas!: personas[];
  getPersonas!: Sequelize.HasManyGetAssociationsMixin<personas>;
  setPersonas!: Sequelize.HasManySetAssociationsMixin<personas, personasId>;
  addPersona!: Sequelize.HasManyAddAssociationMixin<personas, personasId>;
  addPersonas!: Sequelize.HasManyAddAssociationsMixin<personas, personasId>;
  createPersona!: Sequelize.HasManyCreateAssociationMixin<personas>;
  removePersona!: Sequelize.HasManyRemoveAssociationMixin<personas, personasId>;
  removePersonas!: Sequelize.HasManyRemoveAssociationsMixin<personas, personasId>;
  hasPersona!: Sequelize.HasManyHasAssociationMixin<personas, personasId>;
  hasPersonas!: Sequelize.HasManyHasAssociationsMixin<personas, personasId>;
  countPersonas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof nacionalidad {
    return nacionalidad.init({
    ID_NACIONALIDAD: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NACIONALIDAD: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ESTADO_NAC: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'nacionalidad',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_NACIONALIDAD" },
        ]
      },
    ]
  });
  }
}
