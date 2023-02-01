"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requisito_apr = void 0;
const sequelize_1 = require("sequelize");
class requisito_apr extends sequelize_1.Model {
    static initModel(sequelize) {
        return requisito_apr.init({
            ID_REQ_AP: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            FECHA_AP: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            OBSERVACION: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true,
                defaultValue: "Ninguna"
            },
            ID_PERSONA: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'personas',
                    key: 'ID_PERSONA'
                }
            },
            ID_REQ: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'requisitos',
                    key: 'ID_REQ'
                }
            }
        }, {
            sequelize,
            tableName: 'requisito_apr',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_REQ_AP" },
                        { name: "ID_REQ" },
                    ]
                },
                {
                    name: "fk_requisito_apr_personas1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ID_PERSONA" },
                    ]
                },
                {
                    name: "fk_requisito_apr_requisitos1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ID_REQ" },
                    ]
                },
            ]
        });
    }
}
exports.requisito_apr = requisito_apr;
//# sourceMappingURL=requisito_apr.js.map