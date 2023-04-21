"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barrios = void 0;
const sequelize_1 = require("sequelize");
class barrios extends sequelize_1.Model {
    static initModel(sequelize) {
        return barrios.init({
            id_barrio: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            nom_barrio: {
                type: sequelize_1.DataTypes.STRING(120),
                allowNull: false,
                unique: "nom_barrio"
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
                        { name: "id_barrio" },
                    ]
                },
                {
                    name: "nom_barrio",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "nom_barrio" },
                    ]
                },
            ]
        });
    }
}
exports.barrios = barrios;
//# sourceMappingURL=barrios.js.map