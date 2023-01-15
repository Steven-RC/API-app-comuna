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
            ]
        });
    }
}
exports.facturas = facturas;
//# sourceMappingURL=facturas.js.map