"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nacionalidad = void 0;
const sequelize_1 = require("sequelize");
class nacionalidad extends sequelize_1.Model {
    static initModel(sequelize) {
        return nacionalidad.init({
            id_nacionalidad: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            nacionalidad: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
                unique: "nacionalidad_unique"
            },
            estado_nac: {
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
                        { name: "id_nacionalidad" },
                    ]
                },
                {
                    name: "nacionalidad_unique",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "nacionalidad" },
                    ]
                },
            ]
        });
    }
}
exports.nacionalidad = nacionalidad;
//# sourceMappingURL=nacionalidad.js.map