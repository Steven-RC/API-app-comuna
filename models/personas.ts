import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comuneros, comunerosId } from './comuneros';
import type { nacionalidad, nacionalidadId } from './nacionalidad';
import type { requisito_apr, requisito_aprId } from './requisito_apr';

export interface personasAttributes {
  id_persona: string;
  id_nacionalidad?: string;
  cedula: string;
  apellidos?: string;
  nombre: string;
  fecha_de_nacimiento: string;
  genero: number;
  estado?: number;
  celular_per?: string;
  titulo_academico?: string;
}

export type personasPk = "id_persona";
export type personasId = personas[personasPk];
export type personasOptionalAttributes = "id_nacionalidad" | "apellidos" | "estado" | "celular_per" | "titulo_academico";
export type personasCreationAttributes = Optional<personasAttributes, personasOptionalAttributes>;

export class personas extends Model<personasAttributes, personasCreationAttributes> implements personasAttributes {
  id_persona!: string;
  id_nacionalidad?: string;
  cedula!: string;
  apellidos?: string;
  nombre!: string;
  fecha_de_nacimiento!: string;
  genero!: number;
  estado?: number;
  celular_per?: string;
  titulo_academico?: string;

  // personas belongsTo nacionalidad via id_nacionalidad
  id_nacionalidad_nacionalidad!: nacionalidad;
  getId_nacionalidad_nacionalidad!: Sequelize.BelongsToGetAssociationMixin<nacionalidad>;
  setId_nacionalidad_nacionalidad!: Sequelize.BelongsToSetAssociationMixin<nacionalidad, nacionalidadId>;
  createId_nacionalidad_nacionalidad!: Sequelize.BelongsToCreateAssociationMixin<nacionalidad>;
  // personas hasMany comuneros via id_persona
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
  // personas hasMany requisito_apr via id_persona
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
    id_persona: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    id_nacionalidad: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'nacionalidad',
        key: 'id_nacionalidad'
      }
    },
    cedula: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "cedula"
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fecha_de_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    genero: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    celular_per: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    titulo_academico: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "sr."
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
          { name: "id_persona" },
        ]
      },
      {
        name: "cedula",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cedula" },
        ]
      },
      {
        name: "fk_rel_nacionalidad_person",
        using: "BTREE",
        fields: [
          { name: "id_nacionalidad" },
        ]
      },
    ]
  });
  }
}
