"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cuota_anual = void 0;
const sequelize_1 = require("sequelize");
class cuota_anual extends sequelize_1.Model {
    static initModel(sequelize) {
        return cuota_anual.init({
            id_cuota: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            nom_cuota: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false
            },
            valor_cuota: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false
            },
            estado_cuota: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1
            },
            id_anio: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'anio',
                    key: 'id_anio'
                }
            },
            descripcion: {
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
                        { name: "id_cuota" },
                        { name: "id_anio" },
                    ]
                },
                {
                    name: "fk_cuota_anual_table11_idx",
                    using: "BTREE",
                    fields: [
                        { name: "id_anio" },
                    ]
                },
            ]
        });
    }
}
exports.cuota_anual = cuota_anual;
//# sourceMappingURL=cuota_anual.js.map