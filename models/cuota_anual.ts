import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';

export interface cuota_anualAttributes {
  ID_CUOTA: number;
  NOM_CUOTA: string;
  VALOR_CUOTA: number;
  ESTADO_CUOTA: number;
}

export type cuota_anualPk = "ID_CUOTA";
export type cuota_anualId = cuota_anual[cuota_anualPk];
export type cuota_anualOptionalAttributes = "ID_CUOTA" | "ESTADO_CUOTA";
export type cuota_anualCreationAttributes = Optional<cuota_anualAttributes, cuota_anualOptionalAttributes>;

export class cuota_anual extends Model<cuota_anualAttributes, cuota_anualCreationAttributes> implements cuota_anualAttributes {
  ID_CUOTA!: number;
  NOM_CUOTA!: string;
  VALOR_CUOTA!: number;
  ESTADO_CUOTA!: number;

  // cuota_anual hasMany comuneros via ID_CUOTA
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

  static initModel(sequelize: Sequelize.Sequelize): typeof cuota_anual {
    return cuota_anual.init({
    ID_CUOTA: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NOM_CUOTA: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    VALOR_CUOTA: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ESTADO_CUOTA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
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
          { name: "ID_CUOTA" },
        ]
      },
    ]
  });
  }
}
