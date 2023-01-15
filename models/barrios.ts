import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';

export interface barriosAttributes {
  ID_BARRIO: number;
  NOM_BARRIO: string;
}

export type barriosPk = "ID_BARRIO";
export type barriosId = barrios[barriosPk];
export type barriosOptionalAttributes = "ID_BARRIO";
export type barriosCreationAttributes = Optional<barriosAttributes, barriosOptionalAttributes>;

export class barrios extends Model<barriosAttributes, barriosCreationAttributes> implements barriosAttributes {
  ID_BARRIO!: number;
  NOM_BARRIO!: string;

  // barrios hasMany comuneros via ID_BARRIO
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
    ID_BARRIO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOM_BARRIO: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: "NOM_BARRIO"
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
          { name: "ID_BARRIO" },
        ]
      },
      {
        name: "NOM_BARRIO",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NOM_BARRIO" },
        ]
      },
    ]
  });
  }
}
