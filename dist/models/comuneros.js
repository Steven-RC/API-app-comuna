"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comuneros = void 0;
const sequelize_1 = require("sequelize");
class comuneros extends sequelize_1.Model {
    static initModel(sequelize) {
        return comuneros.init({
            id_comunero: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            id_barrio: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                references: {
                    model: 'barrios',
                    key: 'id_barrio'
                }
            },
            id_aso: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                references: {
                    model: 'asociaciones',
                    key: 'id_aso'
                }
            },
            id_persona: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                references: {
                    model: 'personas',
                    key: 'id_persona'
                }
            },
            calificado: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 0
            },
            created_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: true
            },
            created_time: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: true
            },
            estado_com: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            },
            id_terreno: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                references: {
                    model: 'terrenos',
                    key: 'id_terreno'
                }
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
                        { name: "id_comunero" },
                    ]
                },
                {
                    name: "fk_rel_asociacion_comunero",
                    using: "BTREE",
                    fields: [
                        { name: "id_aso" },
                    ]
                },
                {
                    name: "fk_rel_barrio_comunero",
                    using: "BTREE",
                    fields: [
                        { name: "id_barrio" },
                    ]
                },
                {
                    name: "fk_rel_pers_comunero",
                    using: "BTREE",
                    fields: [
                        { name: "id_persona" },
                    ]
                },
                {
                    name: "fk_comuneros_terrenos1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "id_terreno" },
                    ]
                },
            ]
        });
    }
}
exports.comuneros = comuneros;
//# sourceMappingURL=comuneros.js.map