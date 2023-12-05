import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'demeterfinal',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql' 
  }
);