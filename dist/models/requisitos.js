"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requisitos = void 0;
const sequelize_1 = require("sequelize");
class requisitos extends sequelize_1.Model {
    static initModel(sequelize) {
        return requisitos.init({
            id_req: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            requisito: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            observacion: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            req_estado: {
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
                        { name: "id_req" },
                    ]
                },
            ]
        });
    }
}
exports.requisitos = requisitos;
//# sourceMappingURL=requisitos.js.map