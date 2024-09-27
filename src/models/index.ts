
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, Dialect } from 'sequelize';
import * as process from 'process';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json');

const db: { [key: string]: any } = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT as Dialect || 'mysql',
        port: Number(process.env.DB_PORT),
        logging: console.log
    }
);
} else {
  sequelize = new Sequelize(
    config.database as string,
    config.username as string,
    config.password as string,
    config
  );
}

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
