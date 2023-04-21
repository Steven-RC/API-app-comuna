"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anio = void 0;
const sequelize_1 = require("sequelize");
class anio extends sequelize_1.Model {
    static initModel(sequelize) {
        return anio.init({
            id_anio: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            anio: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                unique: "año_unique"
            }
        }, {
            sequelize,
            tableName: 'anio',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id_anio" },
                    ]
                },
                {
                    name: "id_año_unique",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id_anio" },
                    ]
                },
                {
                    name: "año_unique",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "anio" },
                    ]
                },
            ]
        });
    }
}
exports.anio = anio;
//# sourceMappingURL=anio.js.map