"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cuotas_factura = void 0;
const sequelize_1 = require("sequelize");
class cuotas_factura extends sequelize_1.Model {
    static initModel(sequelize) {
        return cuotas_factura.init({
            id_factura: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'facturas',
                    key: 'id_factura'
                }
            },
            id_cuota: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'cuota_anual',
                    key: 'id_cuota'
                }
            },
            id_anio: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                defaultValue: "1",
                primaryKey: true,
                references: {
                    model: 'cuota_anual',
                    key: 'id_anio'
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
                        { name: "id_factura" },
                        { name: "id_cuota" },
                        { name: "id_anio" },
                    ]
                },
                {
                    name: "fk_facturas_has_cuota_anual_cuota_anual1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "id_cuota" },
                        { name: "id_anio" },
                    ]
                },
                {
                    name: "fk_facturas_has_cuota_anual_facturas1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "id_factura" },
                    ]
                },
            ]
        });
    }
}
exports.cuotas_factura = cuotas_factura;
//# sourceMappingURL=cuotas_factura.js.map