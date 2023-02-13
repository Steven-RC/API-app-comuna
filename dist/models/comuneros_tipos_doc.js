"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comuneros_tipos_doc = void 0;
const sequelize_1 = require("sequelize");
class comuneros_tipos_doc extends sequelize_1.Model {
    static initModel(sequelize) {
        return comuneros_tipos_doc.init({
            ID_COMUNERO: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'comuneros',
                    key: 'ID_COMUNERO'
                }
            },
            ID_TIPO_DOC: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'tipo_documentos',
                    key: 'ID_TIPO_DOC'
                }
            },
            DOCUMENTO: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'comuneros_tipos_doc',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_COMUNERO" },
                        { name: "ID_TIPO_DOC" },
                    ]
                },
                {
                    name: "fk_comuneros_has_tipo_documentos_tipo_documentos1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ID_TIPO_DOC" },
                    ]
                },
                {
                    name: "fk_comuneros_has_tipo_documentos_comuneros1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "ID_COMUNERO" },
                    ]
                },
            ]
        });
    }
}
exports.comuneros_tipos_doc = comuneros_tipos_doc;
//# sourceMappingURL=comuneros_tipos_doc.js.map