import { Sequelize } from "sequelize";

const db= new Sequelize('heroku_830548e2ce4b702','bb30978aadc178','203f4d4c',{
    host:'us-cdbr-east-06.cleardb.net',
    dialect:'mysql',
    // logging:false,
});

export default db;