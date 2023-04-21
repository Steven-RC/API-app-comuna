import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';

export interface barriosAttributes {
  id_barrio: string;
  nom_barrio: string;
}

export type barriosPk = "id_barrio";
export type barriosId = barrios[barriosPk];
export type barriosCreationAttributes = barriosAttributes;

export class barrios extends Model<barriosAttributes, barriosCreationAttributes> implements barriosAttributes {
  id_barrio!: string;
  nom_barrio!: string;

  // barrios hasMany comuneros via id_barrio
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

  static initModel(sequelize: Sequelize.Sequelize): typeof barrios {
    return barrios.init({
    id_barrio: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    nom_barrio: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: "nom_barrio"
    }
  }, {
    sequelize,
    tableName: 'barrios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_barrio" },
        ]
      },
      {
        name: "nom_barrio",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nom_barrio" },
        ]
      },
    ]
  });
  }
}
