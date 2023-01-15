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
            ID_COMUNERO: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'comuneros',
                    key: 'ID_COMUNERO'
                }
            },
            ID_TIPO_DOC: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'tipo_documentos',
                    key: 'ID_TIPO_DOC'
                },
                unique: "FK_REL_TIP_DOC_DOCUMENTOS"
            },
            FILE: {
                type: sequelize_1.DataTypes.BLOB,
                allowNull: false
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
                    name: "ID_TIPO_DOC",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_TIPO_DOC" },
                    ]
                },
                {
                    name: "FK_REL_COM_DOCUMENTOS",
                    using: "BTREE",
                    fields: [
                        { name: "ID_COMUNERO" },
                    ]
                },
            ]
        });
    }
}
exports.documentos = documentos;
//# sourceMappingURL=documentos.js.map