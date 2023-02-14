"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.terrenos = void 0;
const sequelize_1 = require("sequelize");
class terrenos extends sequelize_1.Model {
    static initModel(sequelize) {
        return terrenos.init({
            ID_TERRENO: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            LIM_NORTE: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            LIM_SUR: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            LIM_ESTE: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            LIM_OESTE: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            NORTE: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            SUR: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            ESTE: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            OESTE: {
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
                        { name: "ID_TERRENO" },
                    ]
                },
                {
                    name: "ID_TERRENO_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_TERRENO" },
                    ]
                },
            ]
        });
    }
}
exports.terrenos = terrenos;
//# sourceMappingURL=terrenos.js.map