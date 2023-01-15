import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { nacionalidad, nacionalidadId } from './nacionalidad';

export interface personasAttributes {
  ID_PERSONA: number;
  ID_NACIONALIDAD?: number;
  CEDULA: string;
  NOMBRE: string;
  FECHA_DE_NACIMIENTO: string;
  GENERO: number;
  ESTADO?: number;
  CELULAR_PER?: number;
  APELLIDOS?: string;
}

export type personasPk = "ID_PERSONA";
export type personasId = personas[personasPk];
export type personasOptionalAttributes = "ID_PERSONA" | "ID_NACIONALIDAD" | "ESTADO" | "CELULAR_PER" | "APELLIDOS";
export type personasCreationAttributes = Optional<personasAttributes, personasOptionalAttributes>;

export class personas extends Model<personasAttributes, personasCreationAttributes> implements personasAttributes {
  ID_PERSONA!: number;
  ID_NACIONALIDAD?: number;
  CEDULA!: string;
  NOMBRE!: string;
  FECHA_DE_NACIMIENTO!: string;
  GENERO!: number;
  ESTADO?: number;
  CELULAR_PER?: number;
  APELLIDOS?: string;

  // personas belongsTo nacionalidad via ID_NACIONALIDAD
  ID_NACIONALIDAD_nacionalidad!: nacionalidad;
  getID_NACIONALIDAD_nacionalidad!: Sequelize.BelongsToGetAssociationMixin<nacionalidad>;
  setID_NACIONALIDAD_nacionalidad!: Sequelize.BelongsToSetAssociationMixin<nacionalidad, nacionalidadId>;
  createID_NACIONALIDAD_nacionalidad!: Sequelize.BelongsToCreateAssociationMixin<nacionalidad>;
  // personas hasMany comuneros via ID_PERSONA
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

  static initModel(sequelize: Sequelize.Sequelize): typeof personas {
    return personas.init({
    ID_PERSONA: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ID_NACIONALIDAD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nacionalidad',
        key: 'ID_NACIONALIDAD'
      }
    },
    CEDULA: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "CEDULA"
    },
    NOMBRE: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    FECHA_DE_NACIMIENTO: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    GENERO: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ESTADO: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    CELULAR_PER: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    APELLIDOS: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'personas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID_PERSONA" },
        ]
      },
      {
        name: "CEDULA",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CEDULA" },
        ]
      },
      {
        name: "FK_REL_NACIONALIDAD_PERSON",
        using: "BTREE",
        fields: [
          { name: "ID_NACIONALIDAD" },
        ]
      },
    ]
  });
  }
}
