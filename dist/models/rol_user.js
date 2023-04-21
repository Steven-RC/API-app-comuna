"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rol_user = void 0;
const sequelize_1 = require("sequelize");
class rol_user extends sequelize_1.Model {
    static initModel(sequelize) {
        return rol_user.init({
            id_rol: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            nom_rol: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            estado_rol: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'rol_user',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id_rol" },
                    ]
                },
            ]
        });
    }
}
exports.rol_user = rol_user;
//# sourceMappingURL=rol_user.js.map