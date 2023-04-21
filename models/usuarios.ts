import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { rol_user, rol_userId } from './rol_user';

export interface usuariosAttributes {
  id_usuario: string;
  id_comunero?: string;
  id_rol?: string;
  email: string;
  created_at_date: string;
  created_at_time: string;
  nom_user: string;
  pass_user: string;
  estado_user?: number;
  img?: string;
}

export type usuariosPk = "id_usuario";
export type usuariosId = usuarios[usuariosPk];
export type usuariosOptionalAttributes = "id_comunero" | "id_rol" | "estado_user" | "img";
export type usuariosCreationAttributes = Optional<usuariosAttributes, usuariosOptionalAttributes>;

export class usuarios extends Model<usuariosAttributes, usuariosCreationAttributes> implements usuariosAttributes {
  id_usuario!: string;
  id_comunero?: string;
  id_rol?: string;
  email!: string;
  created_at_date!: string;
  created_at_time!: string;
  nom_user!: string;
  pass_user!: string;
  estado_user?: number;
  img?: string;

  // usuarios belongsTo comuneros via id_comunero
  id_comunero_comunero!: comuneros;
  getId_comunero_comunero!: Sequelize.BelongsToGetAssociationMixin<comuneros>;
  setId_comunero_comunero!: Sequelize.BelongsToSetAssociationMixin<comuneros, comunerosId>;
  createId_comunero_comunero!: Sequelize.BelongsToCreateAssociationMixin<comuneros>;
  // usuarios belongsTo rol_user via id_rol
  id_rol_rol_user!: rol_user;
  getId_rol_rol_user!: Sequelize.BelongsToGetAssociationMixin<rol_user>;
  setId_rol_rol_user!: Sequelize.BelongsToSetAssociationMixin<rol_user, rol_userId>;
  createId_rol_rol_user!: Sequelize.BelongsToCreateAssociationMixin<rol_user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof usuarios {
    return usuarios.init({
    id_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    id_comunero: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'comuneros',
        key: 'id_comunero'
      }
    },
    id_rol: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'rol_user',
        key: 'id_rol'
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    created_at_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    created_at_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    nom_user: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    pass_user: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estado_user: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
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
          { name: "id_usuario" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "fk_rel_comunero_usuario",
        using: "BTREE",
        fields: [
          { name: "id_comunero" },
        ]
      },
      {
        name: "fk_rel_user_rol",
        using: "BTREE",
        fields: [
          { name: "id_rol" },
        ]
      },
    ]
  });
  }
}

//evitar que la contraseña se envie al cliente
usuarios.prototype.toJSON = function () {
  const { pass_user, ...object } = this.get();
  return object;
}
