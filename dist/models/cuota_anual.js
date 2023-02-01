"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cuota_anual = void 0;
const sequelize_1 = require("sequelize");
class cuota_anual extends sequelize_1.Model {
    static initModel(sequelize) {
        return cuota_anual.init({
            ID_CUOTA: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            NOM_CUOTA: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false
            },
            VALOR_CUOTA: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false
            },
            ESTADO_CUOTA: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },
            ID_ANIO: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'anio',
                    key: 'ID_ANIO'
                }
            },
            DESCRIPCION: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'cuota_anual',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_CUOTA" },
                        { name: "ID_ANIO" },
                    ]
                },
                {
                    name: "fk_cuota_anual_table11_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ID_ANIO" },
                    ]
                },
            ]
        });
    }
}
exports.cuota_anual = cuota_anual;
//# sourceMappingURL=cuota_anual.js.map