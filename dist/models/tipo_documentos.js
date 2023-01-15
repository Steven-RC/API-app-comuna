"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipo_documentos = void 0;
const sequelize_1 = require("sequelize");
class tipo_documentos extends sequelize_1.Model {
    static initModel(sequelize) {
        return tipo_documentos.init({
            ID_TIPO_DOC: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            TIPO_DOC: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            ESTADO_DOC: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
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
                        { name: "ID_TIPO_DOC" },
                    ]
                },
            ]
        });
    }
}
exports.tipo_documentos = tipo_documentos;
//# sourceMappingURL=tipo_documentos.js.map