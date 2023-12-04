import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { user } from './user.model.js'

export const typeUser = sequelize.define('TypeUsers', {

    ID_TypeUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    Name_Type : {
        type: DataTypes.STRING(15), 
        allowNull: false, 
        validate: {
            notNull: {
                msg: 'El tipo de usuario es requerido'
            },
            customValidate(value) {
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
    }
}, {
    timestamps: false
});

typeUser.hasMany(user, {
    foreignKey: 'TypeUser_ID',
    sourceKey: 'ID_TypeUser'
})

user.belongsTo(typeUser, {
    foreignKey: 'TypeUser_ID',
    targetKey: 'ID_TypeUser'
})
