import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { user } from './user.model.js'

export const typeUser = sequelize.define('TypeUsers', {

    ID_TypeUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Name_Type: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El tipo de usuario es requerido'
            },
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes.');
                }
            },
            len: {
                args: [3, 15],
                msg: 'El nombre del tipo de usuario tener de 3 a 15 caracteres.'
            }
        }
    }
}, {
    timestamps: false
});

typeUser.hasMany(user, {
    foreignKey: {
        name: 'TypeUser_ID',
        allowNull: false,
    },
    sourceKey: 'ID_TypeUser'
})
user.belongsTo(typeUser, {
    foreignKey: {
        name: 'TypeUser_ID',
        allowNull: false,
    },
    targetKey: 'ID_TypeUser'
})
