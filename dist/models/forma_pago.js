"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forma_pago = void 0;
const sequelize_1 = require("sequelize");
class forma_pago extends sequelize_1.Model {
    static initModel(sequelize) {
        return forma_pago.init({
            id_forma_pago: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            forma_pago: {
                type: sequelize_1.DataTypes.STRING(20),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'forma_pago',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id_forma_pago" },
                    ]
                },
            ]
        });
    }
}
exports.forma_pago = forma_pago;
//# sourceMappingURL=forma_pago.js.map