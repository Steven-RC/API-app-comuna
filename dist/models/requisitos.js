"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requisitos = void 0;
const sequelize_1 = require("sequelize");
class requisitos extends sequelize_1.Model {
    static initModel(sequelize) {
        return requisitos.init({
            ID_REQ: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            REQUISITO: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            OBSERVACION: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            REQ_ESTADO: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'requisitos',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_REQ" },
                    ]
                },
            ]
        });
    }
}
exports.requisitos = requisitos;
//# sourceMappingURL=requisitos.js.map