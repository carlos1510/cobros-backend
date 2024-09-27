import "dotenv/config";
import * as process from 'process';
import { Sequelize, Dialect } from "sequelize";

let sequelize: Sequelize;

sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: process.env.DB_DIALECT as Dialect || 'mysql',
        port: Number(process.env.DB_PORT),
        logging: console.log
    }
);

export default sequelize;
