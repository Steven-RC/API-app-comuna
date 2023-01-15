"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barrios = void 0;
const sequelize_1 = require("sequelize");
class barrios extends sequelize_1.Model {
    static initModel(sequelize) {
        return barrios.init({
            ID_BARRIO: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            NOM_BARRIO: {
                type: sequelize_1.DataTypes.STRING(120),
                allowNull: false,
                unique: "NOM_BARRIO"
            }
        }, {
            sequelize,
            tableName: 'barrios',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_BARRIO" },
                    ]
                },
                {
                    name: "NOM_BARRIO",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "NOM_BARRIO" },
                    ]
                },
            ]
        });
    }
}
exports.barrios = barrios;
//# sourceMappingURL=barrios.js.map