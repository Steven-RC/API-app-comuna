import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';

export interface asociacionesAttributes {
  ID_ASO: number;
  NOM_ASOCIACION_?: string;
  ESTADO_ASO?: number;
}

export type asociacionesPk = "ID_ASO";
export type asociacionesId = Asociaciones[asociacionesPk];
export type asociacionesOptionalAttributes = "ID_ASO" | "NOM_ASOCIACION_" | "ESTADO_ASO";
export type asociacionesCreationAttributes = Optional<asociacionesAttributes, asociacionesOptionalAttributes>;

export class Asociaciones extends Model<asociacionesAttributes, asociacionesCreationAttributes> implements asociacionesAttributes {
  ID_ASO!: number;
  NOM_ASOCIACION_?: string;
  ESTADO_ASO?: number;

  // asociaciones hasMany comuneros via ID_ASO
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Asociaciones {
    return Asociaciones.init({
      ID_ASO: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      NOM_ASOCIACION_: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ESTADO_ASO: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1
      }
    }, {
      sequelize,
      tableName: 'asociaciones',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "ID_ASO" },
          ]
        },
      ]
    });
  }
}
