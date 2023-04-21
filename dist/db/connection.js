"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('heroku_830548e2ce4b702', 'bb30978aadc178', '203f4d4c', {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    // logging:false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map