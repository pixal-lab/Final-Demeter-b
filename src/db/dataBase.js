import { Sequelize } from 'sequelize';
const databaseURL = process.env.MYSQL_URL || "demeterfinal";

const config = {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  dialect: 'mysql', // Asegúrate de especificar el dialecto aquí
};

export const sequelize = new Sequelize(
  config
);