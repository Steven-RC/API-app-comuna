import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { Nacionalidad, nacionalidadId } from './nacionalidad';
import type { requisito_apr, requisito_aprId } from './requisito_apr';

export interface personasAttributes {
  ID_PERSONA: number;
  ID_NACIONALIDAD?: number;
  CEDULA: string;
  APELLIDOS?: string;
  NOMBRE: string;
  FECHA_DE_NACIMIENTO: string;
  GENERO: number;
  ESTADO?: number;
  CELULAR_PER?: string;
  TITULO_ACADEMICO?: string;
}

export type personasPk = "ID_PERSONA";
export type personasId = personas[personasPk];
export type personasOptionalAttributes = "ID_PERSONA" | "ID_NACIONALIDAD" | "APELLIDOS" | "ESTADO" | "CELULAR_PER" | "TITULO_ACADEMICO";
export type personasCreationAttributes = Optional<personasAttributes, personasOptionalAttributes>;

export class personas extends Model<personasAttributes, personasCreationAttributes> implements personasAttributes {
  ID_PERSONA!: number;
  ID_NACIONALIDAD?: number;
  CEDULA!: string;
  APELLIDOS?: string;
  NOMBRE!: string;
  FECHA_DE_NACIMIENTO!: string;
  GENERO!: number;
  ESTADO?: number;
  CELULAR_PER?: string;
  TITULO_ACADEMICO?: string;

  // personas belongsTo nacionalidad via ID_NACIONALIDAD
  ID_NACIONALIDAD_nacionalidad!: Nacionalidad;
  getID_NACIONALIDAD_nacionalidad!: Sequelize.BelongsToGetAssociationMixin<Nacionalidad>;
  setID_NACIONALIDAD_nacionalidad!: Sequelize.BelongsToSetAssociationMixin<Nacionalidad, nacionalidadId>;
  createID_NACIONALIDAD_nacionalidad!: Sequelize.BelongsToCreateAssociationMixin<Nacionalidad>;
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
  // personas hasMany requisito_apr via ID_PERSONA
  requisito_aprs!: requisito_apr[];
  getRequisito_aprs!: Sequelize.HasManyGetAssociationsMixin<requisito_apr>;
  setRequisito_aprs!: Sequelize.HasManySetAssociationsMixin<requisito_apr, requisito_aprId>;
  addRequisito_apr!: Sequelize.HasManyAddAssociationMixin<requisito_apr, requisito_aprId>;
  addRequisito_aprs!: Sequelize.HasManyAddAssociationsMixin<requisito_apr, requisito_aprId>;
  createRequisito_apr!: Sequelize.HasManyCreateAssociationMixin<requisito_apr>;
  removeRequisito_apr!: Sequelize.HasManyRemoveAssociationMixin<requisito_apr, requisito_aprId>;
  removeRequisito_aprs!: Sequelize.HasManyRemoveAssociationsMixin<requisito_apr, requisito_aprId>;
  hasRequisito_apr!: Sequelize.HasManyHasAssociationMixin<requisito_apr, requisito_aprId>;
  hasRequisito_aprs!: Sequelize.HasManyHasAssociationsMixin<requisito_apr, requisito_aprId>;
  countRequisito_aprs!: Sequelize.HasManyCountAssociationsMixin;

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
    APELLIDOS: {
      type: DataTypes.STRING(50),
      allowNull: true
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
      type: DataTypes.STRING(10),
      allowNull: true
    },
    TITULO_ACADEMICO: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "Sr."
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
