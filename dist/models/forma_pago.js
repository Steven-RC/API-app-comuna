"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forma_pago = void 0;
const sequelize_1 = require("sequelize");
class forma_pago extends sequelize_1.Model {
    static initModel(sequelize) {
        return forma_pago.init({
            ID_FORMA_PAGO: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            ID_FACTURA: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'facturas',
                    key: 'ID_FACTURA'
                }
            },
            FORMA_PAGO: {
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
                        { name: "ID_FORMA_PAGO" },
                    ]
                },
                {
                    name: "FK_REL_FACT_FORM_PAGO",
                    using: "BTREE",
                    fields: [
                        { name: "ID_FACTURA" },
                    ]
                },
            ]
        });
    }
}
exports.forma_pago = forma_pago;
//# sourceMappingURL=forma_pago.js.map