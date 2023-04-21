import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';

export interface asociacionesAttributes {
  id_aso: string;
  nom_asociacion?: string;
  estado_aso?: number;
}

export type asociacionesPk = "id_aso";
export type asociacionesId = asociaciones[asociacionesPk];
export type asociacionesOptionalAttributes = "nom_asociacion" | "estado_aso";
export type asociacionesCreationAttributes = Optional<asociacionesAttributes, asociacionesOptionalAttributes>;

export class asociaciones extends Model<asociacionesAttributes, asociacionesCreationAttributes> implements asociacionesAttributes {
  id_aso!: string;
  nom_asociacion?: string;
  estado_aso?: number;

  // asociaciones hasMany comuneros via id_aso
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

  static initModel(sequelize: Sequelize.Sequelize): typeof asociaciones {
    return asociaciones.init({
    id_aso: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    nom_asociacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado_aso: {
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
          { name: "id_aso" },
        ]
      },
    ]
  });
  }
}
