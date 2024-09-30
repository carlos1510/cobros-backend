
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, Dialect } from 'sequelize';
import * as dotenv from 'dotenv';  // Importar dotenv

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db: { [key: string]: any } = {};

// Obtener el dialecto desde la variable de entorno
const dialect = process.env.DB_DIALECT as Dialect;

if (!dialect) {
  throw new Error('El dialecto de la base de datos no está configurado correctamente. Asegúrate de definir DB_DIALECT en tu archivo .env.');
}

let sequelize: Sequelize;

// Verificar si se debe usar una variable de entorno para la configuración de la base de datos
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    dialect: dialect,  // Aquí se pasa el dialecto
    port: Number(process.env.DB_PORT),
    logging: console.log,
  });
} else {
  // Si no se usan variables de entorno, se usa la configuración de config.json
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config, // Aquí se incluye la configuración de config.json
    dialect: dialect, // Asegurar que se pasa el dialecto
  });
}

// Cargar los modelos
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file));
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

