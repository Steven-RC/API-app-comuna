"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anio = void 0;
const sequelize_1 = require("sequelize");
class anio extends sequelize_1.Model {
    static initModel(sequelize) {
        return anio.init({
            ID_ANIO: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            ANIO: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                unique: "AÑO_UNIQUE"
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
                        { name: "ID_ANIO" },
                    ]
                },
                {
                    name: "ID_AÑO_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_ANIO" },
                    ]
                },
                {
                    name: "AÑO_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ANIO" },
                    ]
                },
            ]
        });
    }
}
exports.anio = anio;
//# sourceMappingURL=anio.js.map