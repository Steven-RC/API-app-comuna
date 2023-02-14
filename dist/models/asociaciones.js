"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asociaciones = void 0;
const sequelize_1 = require("sequelize");
class Asociaciones extends sequelize_1.Model {
    static initModel(sequelize) {
        return Asociaciones.init({
            ID_ASO: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            NOM_ASOCIACION_: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            ESTADO_ASO: {
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
                        { name: "ID_ASO" },
                    ]
                },
            ]
        });
    }
}
exports.Asociaciones = Asociaciones;
//# sourceMappingURL=asociaciones.js.map