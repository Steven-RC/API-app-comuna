"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personas = void 0;
const sequelize_1 = require("sequelize");
class personas extends sequelize_1.Model {
    static initModel(sequelize) {
        return personas.init({
            ID_PERSONA: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            ID_NACIONALIDAD: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'nacionalidad',
                    key: 'ID_NACIONALIDAD'
                }
            },
            CEDULA: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
                unique: "CEDULA"
            },
            NOMBRE: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false
            },
            FECHA_DE_NACIMIENTO: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            GENERO: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false
            },
            ESTADO: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            },
            CELULAR_PER: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true
            },
            APELLIDOS: {
                type: sequelize_1.DataTypes.STRING(50),
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
exports.personas = personas;
//# sourceMappingURL=personas.js.map