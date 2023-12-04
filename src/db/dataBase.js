import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'demeterfinal',
  'root',
  'Elefante1.',
  {
    host: 'localhost',
    dialect: 'mysql' 
  }
);