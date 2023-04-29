"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = void 0;
const sequelize_1 = require("sequelize");
class usuarios extends sequelize_1.Model {
    static initModel(sequelize) {
        return usuarios.init({
            id_usuario: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            id_comunero: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                references: {
                    model: 'comuneros',
                    key: 'id_comunero'
                }
            },
            id_rol: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                references: {
                    model: 'rol_user',
                    key: 'id_rol'
                }
            },
            email: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
                unique: "email"
            },
            created_at_date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false
            },
            created_at_time: {
                type: sequelize_1.DataTypes.TIME,
                allowNull: false
            },
            nom_user: {
                type: sequelize_1.DataTypes.STRING(12),
                allowNull: false
            },
            pass_user: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            estado_user: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 1
            },
            img: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            theme: {
                type: sequelize_1.DataTypes.STRING(6),
                allowNull: true,
                defaultValue: "light"
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
                        { name: "id_usuario" },
                    ]
                },
                {
                    name: "email",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "email" },
                    ]
                },
                {
                    name: "fk_rel_comunero_usuario",
                    using: "BTREE",
                    fields: [
                        { name: "id_comunero" },
                    ]
                },
                {
                    name: "fk_rel_user_rol",
                    using: "BTREE",
                    fields: [
                        { name: "id_rol" },
                    ]
                },
            ]
        });
    }
}
exports.usuarios = usuarios;
//evitar  que la contraseña se envie en la respuesta
usuarios.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    var { pass_user } = values, newValues = __rest(values, ["pass_user"]);
    return newValues;
};
//# sourceMappingURL=usuarios.js.map