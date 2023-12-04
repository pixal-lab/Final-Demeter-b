import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { permission  } from "./permission.model.js";

export const permissionModule = sequelize.define('PermissionModules', {
    
    ID_PermissionModule: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },

    State: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El estado es requerido'
            }
        }
    }
    
}, {
    timestamps: false
});

permissionModule.hasMany(permission, {
    foreignKey: 'PermissionModule_ID',
    sourceKey: 'ID_PermissionModule'
})

permission.belongsTo(permissionModule, {
    foreignKey: 'PermissionModule_ID',
    targetKey: 'ID_PermissionModule'
})