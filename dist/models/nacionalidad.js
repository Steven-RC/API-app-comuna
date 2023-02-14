"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nacionalidad = void 0;
const sequelize_1 = require("sequelize");
class Nacionalidad extends sequelize_1.Model {
    static initModel(sequelize) {
        return Nacionalidad.init({
            ID_NACIONALIDAD: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            NACIONALIDAD: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
                unique: "NACIONALIDAD_UNIQUE"
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
                {
                    name: "NACIONALIDAD_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "NACIONALIDAD" },
                    ]
                },
            ]
        });
    }
}
exports.Nacionalidad = Nacionalidad;
//# sourceMappingURL=nacionalidad.js.map