"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rol_user = void 0;
const sequelize_1 = require("sequelize");
class rol_user extends sequelize_1.Model {
    static initModel(sequelize) {
        return rol_user.init({
            ID_ROL: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            NOM_ROL: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            ESTADO_ROL: {
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
                        { name: "ID_ROL" },
                    ]
                },
            ]
        });
    }
}
exports.rol_user = rol_user;
//# sourceMappingURL=rol_user.js.map