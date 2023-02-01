"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facturas = void 0;
const sequelize_1 = require("sequelize");
class facturas extends sequelize_1.Model {
    static initModel(sequelize) {
        return facturas.init({
            ID_FACTURA: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            ID_COMUNERO: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'comuneros',
                    key: 'ID_COMUNERO'
                }
            },
            FECHA: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            HORA: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false
            },
            SUBTOTAL_FAC: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false
            },
            TOTAL_FAC: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false
            },
            DESCRIP_FAC: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true
            },
            ESTADO_FAC: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            },
            ID_FORMA_PAGO: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                references: {
                    model: 'forma_pago',
                    key: 'ID_FORMA_PAGO'
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
                        { name: "ID_FACTURA" },
                    ]
                },
                {
                    name: "FK_REL_COMUNERO_FACT",
                    using: "BTREE",
                    fields: [
                        { name: "ID_COMUNERO" },
                    ]
                },
                {
                    name: "fk_facturas_forma_pago1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ID_FORMA_PAGO" },
                    ]
                },
            ]
        });
    }
}
exports.facturas = facturas;
//# sourceMappingURL=facturas.js.map