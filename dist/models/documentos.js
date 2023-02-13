"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentos = void 0;
const sequelize_1 = require("sequelize");
class documentos extends sequelize_1.Model {
    static initModel(sequelize) {
        return documentos.init({
            ID_DOCUMENTO: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            DOCUMENTO: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            ID_TIPO_DOC: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tipo_documentos',
                    key: 'ID_TIPO_DOC'
                }
            }
        }, {
            sequelize,
            tableName: 'documentos',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_DOCUMENTO" },
                    ]
                },
                {
                    name: "fk_documentos_tipo_documentos1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ID_TIPO_DOC" },
                    ]
                },
            ]
        });
    }
}
exports.documentos = documentos;
//# sourceMappingURL=documentos.js.map