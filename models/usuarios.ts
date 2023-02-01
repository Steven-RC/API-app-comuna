import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { rol_user, rol_userId } from './rol_user';

export interface usuariosAttributes {
  ID_USUARIO: number;
  ID_COMUNERO?: number;
  ID_ROL?: number;
  EMAIL: string;
  CREATED_AT_DATE: string;
  CREATED_AT_TIME: string;
  NOM_USER: string;
  PASS_USER: string;
  ESTADO_USER?: number;
}

export type usuariosPk = "ID_USUARIO";
export type usuariosId = usuarios[usuariosPk];
export type usuariosOptionalAttributes = "ID_USUARIO" | "ID_COMUNERO" | "ID_ROL" | "ESTADO_USER";
export type usuariosCreationAttributes = Optional<usuariosAttributes, usuariosOptionalAttributes>;

export class usuarios extends Model<usuariosAttributes, usuariosCreationAttributes> implements usuariosAttributes {
  ID_USUARIO!: number;
  ID_COMUNERO?: number;
  ID_ROL?: number;
  EMAIL!: string;
  CREATED_AT_DATE!: string;
  CREATED_AT_TIME!: string;
  NOM_USER!: string;
  PASS_USER!: string;
  ESTADO_USER?: number;

  // usuarios belongsTo comuneros via ID_COMUNERO
  ID_COMUNERO_comunero!: comuneros;
  getID_COMUNERO_comunero!: Sequelize.BelongsToGetAssociationMixin<comuneros>;
  setID_COMUNERO_comunero!: Sequelize.BelongsToSetAssociationMixin<comuneros, comunerosId>;
  createID_COMUNERO_comunero!: Sequelize.BelongsToCreateAssociationMixin<comuneros>;
  // usuarios belongsTo rol_user via ID_ROL
  ID_ROL_rol_user!: rol_user;
  getID_ROL_rol_user!: Sequelize.BelongsToGetAssociationMixin<rol_user>;
  setID_ROL_rol_user!: Sequelize.BelongsToSetAssociationMixin<rol_user, rol_userId>;
  createID_ROL_rol_user!: Sequelize.BelongsToCreateAssociationMixin<rol_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof usuarios {
    return usuarios.init({
    ID_USUARIO: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_COMUNERO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'comuneros',
        key: 'ID_COMUNERO'
      }
    },
    ID_ROL: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rol_user',
        key: 'ID_ROL'
      }
    },
    EMAIL: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "EMAIL"
    },
    CREATED_AT_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    CREATED_AT_TIME: {
      type: DataTypes.TIME,
      allowNull: false
    },
    NOM_USER: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    PASS_USER: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ESTADO_USER: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_USUARIO" },
        ]
      },
      {
        name: "EMAIL",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "EMAIL" },
        ]
      },
      {
        name: "FK_REL_COMUNERO_USUARIO",
        using: "BTREE",
        fields: [
          { name: "ID_COMUNERO" },
        ]
      },
      {
        name: "FK_REL_USER_ROL",
        using: "BTREE",
        fields: [
          { name: "ID_ROL" },
        ]
      },
    ]
  });
  }
}
