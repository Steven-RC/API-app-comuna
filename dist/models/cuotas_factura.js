"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cuotas_factura = void 0;
const sequelize_1 = require("sequelize");
class cuotas_factura extends sequelize_1.Model {
    static initModel(sequelize) {
        return cuotas_factura.init({
            ID_FACTURA: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'facturas',
                    key: 'ID_FACTURA'
                }
            },
            ID_CUOTA: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'cuota_anual',
                    key: 'ID_CUOTA'
                }
            },
            ID_ANIO: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                primaryKey: true,
                references: {
                    model: 'cuota_anual',
                    key: 'ID_ANIO'
                }
            }
        }, {
            sequelize,
            tableName: 'cuotas_factura',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_FACTURA" },
                        { name: "ID_CUOTA" },
                        { name: "ID_ANIO" },
                    ]
                },
                {
                    name: "fk_facturas_has_cuota_anual_cuota_anual1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ID_CUOTA" },
                        { name: "ID_ANIO" },
                    ]
                },
                {
                    name: "fk_facturas_has_cuota_anual_facturas1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ID_FACTURA" },
                    ]
                },
            ]
        });
    }
}
exports.cuotas_factura = cuotas_factura;
//# sourceMappingURL=cuotas_factura.js.map