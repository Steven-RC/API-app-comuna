import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';

export interface terrenosAttributes {
  ID_TERRENO: number;
  LIM_NORTE?: string;
  LIM_SUR?: string;
  LIM_ESTE?: string;
  LIM_OESTE?: string;
  NORTE?: number;
  SUR?: number;
  ESTE?: number;
  OESTE?: number;
}

export type terrenosPk = "ID_TERRENO";
export type terrenosId = terrenos[terrenosPk];
export type terrenosOptionalAttributes = "ID_TERRENO" | "LIM_NORTE" | "LIM_SUR" | "LIM_ESTE" | "LIM_OESTE" | "NORTE" | "SUR" | "ESTE" | "OESTE";
export type terrenosCreationAttributes = Optional<terrenosAttributes, terrenosOptionalAttributes>;

export class terrenos extends Model<terrenosAttributes, terrenosCreationAttributes> implements terrenosAttributes {
  ID_TERRENO!: number;
  LIM_NORTE?: string;
  LIM_SUR?: string;
  LIM_ESTE?: string;
  LIM_OESTE?: string;
  NORTE?: number;
  SUR?: number;
  ESTE?: number;
  OESTE?: number;

  // terrenos hasMany comuneros via ID_TERRENO
  comuneros!: comuneros[];
  getComuneros!: Sequelize.HasManyGetAssociationsMixin<comuneros>;
  setComuneros!: Sequelize.HasManySetAssociationsMixin<comuneros, comunerosId>;
  addComunero!: Sequelize.HasManyAddAssociationMixin<comuneros, comunerosId>;
  addComuneros!: Sequelize.HasManyAddAssociationsMixin<comuneros, comunerosId>;
  createComunero!: Sequelize.HasManyCreateAssociationMixin<comuneros>;
  removeComunero!: Sequelize.HasManyRemoveAssociationMixin<comuneros, comunerosId>;
  removeComuneros!: Sequelize.HasManyRemoveAssociationsMixin<comuneros, comunerosId>;
  hasComunero!: Sequelize.HasManyHasAssociationMixin<comuneros, comunerosId>;
  hasComuneros!: Sequelize.HasManyHasAssociationsMixin<comuneros, comunerosId>;
  countComuneros!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof terrenos {
    return terrenos.init({
    ID_TERRENO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    LIM_NORTE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LIM_SUR: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LIM_ESTE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LIM_OESTE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    NORTE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    SUR: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    ESTE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    OESTE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'terrenos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_TERRENO" },
        ]
      },
      {
        name: "ID_TERRENO_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_TERRENO" },
        ]
      },
    ]
  });
  }
}
