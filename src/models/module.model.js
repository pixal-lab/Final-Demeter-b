import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { modulePermission } from "./modulePermission.model.js";

export const module = sequelize.define('Modules', {

    ID_Module: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Name_Module: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre es requerido"
            },
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes.');
                }
            },
            len: {
                args: [3, 20],
                msg: 'El nombre del modulo debe tener de 3 a 20 caracteres.'
            }
        }
    }

}, {
    timestamps: false
});

module.hasMany(modulePermission, {
    foreignKey: {
        name: 'Module_ID',
        allowNull: false,
    },
    sourceKey: 'ID_Module'
})
modulePermission.belongsTo(module, {
    foreignKey: {
        name: 'Module_ID',
        allowNull: false,
    },
    targetKey: 'ID_Module'
})