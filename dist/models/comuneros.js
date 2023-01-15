"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comuneros = void 0;
const sequelize_1 = require("sequelize");
class comuneros extends sequelize_1.Model {
    static initModel(sequelize) {
        return comuneros.init({
            ID_COMUNERO: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            ID_BARRIO: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'barrios',
                    key: 'ID_BARRIO'
                }
            },
            ID_ASO: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'asociaciones',
                    key: 'ID_ASO'
                }
            },
            ID_CUOTA: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'cuota_anual',
                    key: 'ID_CUOTA'
                }
            },
            ID_PERSONA: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'personas',
                    key: 'ID_PERSONA'
                }
            },
            CALIFICADO: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 0
            },
            CREATED_DATE: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            CREATED_TIME: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: true
            },
            ESTADO_COM: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'comuneros',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_COMUNERO" },
                    ]
                },
                {
                    name: "FK_REL_ASOCIACION_COMUNERO",
                    using: "BTREE",
                    fields: [
                        { name: "ID_ASO" },
                    ]
                },
                {
                    name: "FK_REL_BARRIO_COMUNERO",
                    using: "BTREE",
                    fields: [
                        { name: "ID_BARRIO" },
                    ]
                },
                {
                    name: "FK_REL_CUOTA_COM",
                    using: "BTREE",
                    fields: [
                        { name: "ID_CUOTA" },
                    ]
                },
                {
                    name: "FK_REL_PERS_COMUNERO",
                    using: "BTREE",
                    fields: [
                        { name: "ID_PERSONA" },
                    ]
                },
            ]
        });
    }
}
exports.comuneros = comuneros;
//# sourceMappingURL=comuneros.js.map