import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const modulePermission = sequelize.define('ModulePermission', {

  ID_ModulePermission: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false
});