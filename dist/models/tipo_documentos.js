"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipo_documentos = void 0;
const sequelize_1 = require("sequelize");
class tipo_documentos extends sequelize_1.Model {
    static initModel(sequelize) {
        return tipo_documentos.init({
            id_tipo_doc: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            tipo_doc: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            estado_doc: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            },
            alias: {
                type: sequelize_1.DataTypes.STRING(60),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'tipo_documentos',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "id_tipo_doc" },
                    ]
                },
            ]
        });
    }
}
exports.tipo_documentos = tipo_documentos;
//# sourceMappingURL=tipo_documentos.js.map