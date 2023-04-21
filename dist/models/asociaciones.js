"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asociaciones = void 0;
const sequelize_1 = require("sequelize");
class asociaciones extends sequelize_1.Model {
    static initModel(sequelize) {
        return asociaciones.init({
            id_aso: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            nom_asociacion: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            estado_aso: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'asociaciones',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id_aso" },
                    ]
                },
            ]
        });
    }
}
exports.asociaciones = asociaciones;
//# sourceMappingURL=asociaciones.js.map