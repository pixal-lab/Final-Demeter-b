import { Sequelize } from 'sequelize';

// Verificar si la variable de entorno RAILWAY_DATABASE_URL está presente
const railwayDatabaseURL = process.env.RAILWAY_DATABASE_URL;

// Configuración predeterminada si RAILWAY_DATABASE_URL no está presente
const localDatabaseConfig = {
  database: 'demeterfinal',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql'
};

// Utilizar la configuración de Railway si está presente, de lo contrario, utilizar la configuración local
const databaseConfig = railwayDatabaseURL ? { url: railwayDatabaseURL } : localDatabaseConfig;

export const sequelize = new Sequelize(databaseConfig);
