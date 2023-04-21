"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comuneros_tipos_doc = void 0;
const sequelize_1 = require("sequelize");
class comuneros_tipos_doc extends sequelize_1.Model {
    static initModel(sequelize) {
        return comuneros_tipos_doc.init({
            id_comunero: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'comuneros',
                    key: 'id_comunero'
                }
            },
            id_tipo_doc: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'tipo_documentos',
                    key: 'id_tipo_doc'
                }
            },
            documento: {
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
                        { name: "id_comunero" },
                        { name: "id_tipo_doc" },
                    ]
                },
                {
                    name: "fk_comuneros_has_tipo_documentos_tipo_documentos1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "id_tipo_doc" },
                    ]
                },
                {
                    name: "fk_comuneros_has_tipo_documentos_comuneros1_idx",
                    using: "BTREE",
                    fields: [
                        { name: "id_comunero" },
                    ]
                },
            ]
        });
    }
}
exports.comuneros_tipos_doc = comuneros_tipos_doc;
//# sourceMappingURL=comuneros_tipos_doc.js.map