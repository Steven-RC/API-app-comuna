"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facturas = void 0;
const sequelize_1 = require("sequelize");
class facturas extends sequelize_1.Model {
    static initModel(sequelize) {
        return facturas.init({
            id_factura: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            id_comunero: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                references: {
                    model: 'comuneros',
                    key: 'id_comunero'
                }
            },
            fecha: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            hora: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false
            },
            subtotal_fac: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false
            },
            total_fac: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false
            },
            descrip_fac: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            estado_fac: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            },
            id_forma_pago: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: "1",
                references: {
                    model: 'forma_pago',
                    key: 'id_forma_pago'
                }
            }
        }, {
            sequelize,
            tableName: 'facturas',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id_factura" },
                    ]
                },
                {
                    name: "fk_rel_comunero_fact",
                    using: "BTREE",
                    fields: [
                        { name: "id_comunero" },
                    ]
                },
                {
                    name: "fk_facturas_forma_pago1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "id_forma_pago" },
                    ]
                },
            ]
        });
    }
}
exports.facturas = facturas;
//# sourceMappingURL=facturas.js.map