import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';

export interface terrenosAttributes {
  id_terreno: string;
  lim_norte?: string;
  lim_sur?: string;
  lim_este?: string;
  lim_oeste?: string;
  norte?: number;
  sur?: number;
  este?: number;
  oeste?: number;
}

export type terrenosPk = "id_terreno";
export type terrenosId = terrenos[terrenosPk];
export type terrenosOptionalAttributes = "lim_norte" | "lim_sur" | "lim_este" | "lim_oeste" | "norte" | "sur" | "este" | "oeste";
export type terrenosCreationAttributes = Optional<terrenosAttributes, terrenosOptionalAttributes>;

export class terrenos extends Model<terrenosAttributes, terrenosCreationAttributes> implements terrenosAttributes {
  id_terreno!: string;
  lim_norte?: string;
  lim_sur?: string;
  lim_este?: string;
  lim_oeste?: string;
  norte?: number;
  sur?: number;
  este?: number;
  oeste?: number;

  // terrenos hasMany comuneros via id_terreno
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
    id_terreno: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    lim_norte: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lim_sur: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lim_este: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lim_oeste: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    norte: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    sur: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    este: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    oeste: {
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
          { name: "id_terreno" },
        ]
      },
      {
        name: "id_terreno_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_terreno" },
        ]
      },
    ]
  });
  }
}
