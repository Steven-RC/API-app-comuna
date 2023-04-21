"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personas = void 0;
const sequelize_1 = require("sequelize");
class personas extends sequelize_1.Model {
    static initModel(sequelize) {
        return personas.init({
            id_persona: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            id_nacionalidad: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                references: {
                    model: 'nacionalidad',
                    key: 'id_nacionalidad'
                }
            },
            cedula: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
                unique: "cedula"
            },
            apellidos: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false
            },
            fecha_de_nacimiento: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            genero: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            estado: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            },
            celular_per: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true
            },
            titulo_academico: {
                type: sequelize_1.DataTypes.STRING(10),
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
exports.personas = personas;
//# sourceMappingURL=personas.js.map