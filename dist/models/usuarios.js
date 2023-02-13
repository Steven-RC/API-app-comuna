"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = void 0;
const sequelize_1 = require("sequelize");
class usuarios extends sequelize_1.Model {
    static initModel(sequelize) {
        return usuarios.init({
            ID_USUARIO: {
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
            ID_ROL: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'rol_user',
                    key: 'ID_ROL'
                }
            },
            EMAIL: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
                unique: "EMAIL"
            },
            CREATED_AT_DATE: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            CREATED_AT_TIME: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false
            },
            NOM_USER: {
                type: sequelize_1.DataTypes.STRING(12),
                allowNull: false
            },
            PASS_USER: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            ESTADO_USER: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            },
            img: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'usuarios',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "ID_USUARIO" },
                    ]
                },
                {
                    name: "EMAIL",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "EMAIL" },
                    ]
                },
                {
                    name: "FK_REL_COMUNERO_USUARIO",
                    using: "BTREE",
                    fields: [
                        { name: "ID_COMUNERO" },
                    ]
                },
                {
                    name: "FK_REL_USER_ROL",
                    using: "BTREE",
                    fields: [
                        { name: "ID_ROL" },
                    ]
                },
            ]
        });
    }
}
exports.usuarios = usuarios;
//# sourceMappingURL=usuarios.js.map