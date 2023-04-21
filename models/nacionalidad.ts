import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { personas, personasId } from './personas';

export interface nacionalidadAttributes {
  id_nacionalidad: string;
  nacionalidad?: string;
  estado_nac?: number;
}

export type nacionalidadPk = "id_nacionalidad";
export type nacionalidadId = nacionalidad[nacionalidadPk];
export type nacionalidadOptionalAttributes = "nacionalidad" | "estado_nac";
export type nacionalidadCreationAttributes = Optional<nacionalidadAttributes, nacionalidadOptionalAttributes>;

export class nacionalidad extends Model<nacionalidadAttributes, nacionalidadCreationAttributes> implements nacionalidadAttributes {
  id_nacionalidad!: string;
  nacionalidad?: string;
  estado_nac?: number;

  // nacionalidad hasMany personas via id_nacionalidad
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
    id_nacionalidad: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    nacionalidad: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "nacionalidad_unique"
    },
    estado_nac: {
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
          { name: "id_nacionalidad" },
        ]
      },
      {
        name: "nacionalidad_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nacionalidad" },
        ]
      },
    ]
  });
  }
}
