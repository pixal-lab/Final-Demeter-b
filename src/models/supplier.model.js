import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { shopping } from './shopping.model.js'

export const supplier = sequelize.define('Suppliers', {

    ID_Supplier: {
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
            }, 
            
        }
    },

    Document: {
        type: DataTypes.STRING(10), 
        allowNull: false, 
        unique: true,
        validate: {
            notNull: {
                msg: 'El documento es requerido'
            },   
        }
    },

    Name_Supplier: {
        type: DataTypes.STRING(50), 
        allowNull: false, 
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
           
            len: {
                args: [5, 50],
                msg: 'El nombre debe tener de 5 a 50 caracteres.'
            }
        }
    },

    Name_Business : {
        type: DataTypes.STRING(50), 
        allowNull: true, 
        unique: true,
        validate: {
            
            len: {
                args: [5, 50],
                msg: 'El nombre debe tener de 5 a 50 caracteres.'
            }
        }
    },

    Phone: {
        type: DataTypes.STRING(12), 
        allowNull: false,
        unique: true,
        
    },

    Email: {
        type: DataTypes.STRING(80),
        allowNull: false, 
        unique: true,
        validate: {
            notNull: {
                msg: 'El correo es requerido'
            },
            isEmail: {
                msg: 'El correo electrónico debe ser válido y contener el símbolo "@"'
            }
        }
    },

    City: {
        type: DataTypes.STRING(20), 
        allowNull: false, 
        validate: {
            notNull: {
                msg: 'La ciudad es requerido'
            },
        }
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

supplier.hasMany(shopping, {
    foreignKey: 'Supplier_ID',
    sourceKey: 'ID_Supplier'
})

shopping.belongsTo(supplier, {
    foreignKey: 'Supplier_ID',
    targetKey: 'ID_Supplier'
})