"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.terrenos = void 0;
const sequelize_1 = require("sequelize");
class terrenos extends sequelize_1.Model {
    static initModel(sequelize) {
        return terrenos.init({
            id_terreno: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            lim_norte: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            lim_sur: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            lim_este: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            lim_oeste: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            norte: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            sur: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            este: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            oeste: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            }
        }, {
            sequelize,
            tableName: 'terrenos',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id_terreno" },
                    ]
                },
                {
                    name: "id_terreno_unique",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id_terreno" },
                    ]
                },
            ]
        });
    }
}
exports.terrenos = terrenos;
//# sourceMappingURL=terrenos.js.map