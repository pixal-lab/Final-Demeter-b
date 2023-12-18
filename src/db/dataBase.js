import { Sequelize } from 'sequelize';


const dbConfig = {
  host: process.env.BD_HOST || "roundhouse.proxy.rlwy.net",
  port: process.env.BD_PORT || "45223",
  username: process.env.BD_USER || 'root',
  password: process.env.BD_PASSWORD || "4A36FFcf3EebF51hC5EEHceCC65f316g",
  database: process.env.BD_NAME || "railway",
  dialect: 'mysql' 
  
}

export const sequelize = new Sequelize(
  
  dbConfig,
);