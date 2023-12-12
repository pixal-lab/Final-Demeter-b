import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { shopping } from './shopping.model.js'
import { sale } from './sale.model.js'


export const user = sequelize.define('Users', {

    ID_User: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    }, 

    Type_Document: {
        type: DataTypes.STRING(15), 
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El tipo de documento es requerido"
            }
        }
    },

    Document: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        unique: true,
        validate: {
            notNull: {
                msg: 'El documento es requerido'
            },
            isNumeric: {
                msg: 'El campo de número de identificacion debe contener solo números'
            }
        }
    },

    Name_User: {
        type: DataTypes.STRING(30), 
        allowNull: false, 
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
            customValidate(value) {
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Nombre: Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
    },

    LastName_User:{
        type: DataTypes.STRING(30), 
        allowNull: false, 
        validate:{
            notNull: {
                msg: 'El apellido es requerido'
            },
            customValidate(value) {
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Apellido: Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
    },

    Email: {
        type: DataTypes.STRING(80),
        allowNull: true, 
        unique: true
    }, 

    Password: {
        type: DataTypes.STRING,
        allowNull: true
        
    },

    Restaurant: {
        type: DataTypes.STRING(15),
        allowNull: true
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

user.hasMany(shopping, {
    foreignKey: 'User_ID',
    sourceKey: 'ID_User'
})

shopping.belongsTo(user, {
    foreignKey: 'User_ID',
    targetKey: 'ID_User'
})

user.hasMany(sale, {
    foreignKey: 'User_ID',
    sourceKey: 'ID_User'
})

sale.belongsTo(user, {
    foreignKey: 'User_ID',
    targetKey: 'ID_User'
})