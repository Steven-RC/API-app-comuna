import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { usuarios, usuariosId } from './usuarios';

export interface rol_userAttributes {
  id_rol: string;
  nom_rol: string;
  estado_rol?: number;
}

export type rol_userPk = "id_rol";
export type rol_userId = rol_user[rol_userPk];
export type rol_userOptionalAttributes = "estado_rol";
export type rol_userCreationAttributes = Optional<rol_userAttributes, rol_userOptionalAttributes>;

export class rol_user extends Model<rol_userAttributes, rol_userCreationAttributes> implements rol_userAttributes {
  id_rol!: string;
  nom_rol!: string;
  estado_rol?: number;

  // rol_user hasMany usuarios via id_rol
  usuarios!: usuarios[];
  getUsuarios!: Sequelize.HasManyGetAssociationsMixin<usuarios>;
  setUsuarios!: Sequelize.HasManySetAssociationsMixin<usuarios, usuariosId>;
  addUsuario!: Sequelize.HasManyAddAssociationMixin<usuarios, usuariosId>;
  addUsuarios!: Sequelize.HasManyAddAssociationsMixin<usuarios, usuariosId>;
  createUsuario!: Sequelize.HasManyCreateAssociationMixin<usuarios>;
  removeUsuario!: Sequelize.HasManyRemoveAssociationMixin<usuarios, usuariosId>;
  removeUsuarios!: Sequelize.HasManyRemoveAssociationsMixin<usuarios, usuariosId>;
  hasUsuario!: Sequelize.HasManyHasAssociationMixin<usuarios, usuariosId>;
  hasUsuarios!: Sequelize.HasManyHasAssociationsMixin<usuarios, usuariosId>;
  countUsuarios!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof rol_user {
    return rol_user.init({
    id_rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    nom_rol: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    estado_rol: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'rol_user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_rol" },
        ]
      },
    ]
  });
  }
}
