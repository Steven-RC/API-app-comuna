"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nacionalidad = void 0;
const sequelize_1 = require("sequelize");
class nacionalidad extends sequelize_1.Model {
    static initModel(sequelize) {
        return nacionalidad.init({
            ID_NACIONALIDAD: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            NACIONALIDAD: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            ESTADO_NAC: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'nacionalidad',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_NACIONALIDAD" },
                    ]
                },
            ]
        });
    }
}
exports.nacionalidad = nacionalidad;
//# sourceMappingURL=nacionalidad.js.map