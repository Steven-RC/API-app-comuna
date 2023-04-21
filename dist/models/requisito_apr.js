"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requisito_apr = void 0;
const sequelize_1 = require("sequelize");
class requisito_apr extends sequelize_1.Model {
    static initModel(sequelize) {
        return requisito_apr.init({
            id_req_ap: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            fecha_ap: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            observacion: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: true,
                defaultValue: "ninguna"
            },
            id_persona: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                references: {
                    model: 'personas',
                    key: 'id_persona'
                }
            },
            id_req: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'requisitos',
                    key: 'id_req'
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
                        { name: "id_req_ap" },
                        { name: "id_req" },
                    ]
                },
                {
                    name: "fk_requisito_apr_personas1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "id_persona" },
                    ]
                },
                {
                    name: "fk_requisito_apr_requisitos1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "id_req" },
                    ]
                },
            ]
        });
    }
}
exports.requisito_apr = requisito_apr;
//# sourceMappingURL=requisito_apr.js.map