import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { supplies } from './supplies.model.js'

export const suppliesCategory =  sequelize.define('SuppliesCategorys', {

    ID_SuppliesCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    }, 

    Name_SuppliesCategory: {
        type: DataTypes.STRING(30), 
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El nombre es requerido"
            }, 
            customValidate(value) {
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('Se debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
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

suppliesCategory.hasMany(supplies, {
    foreignKey: 'SuppliesCategory_ID',
    sourceKey: 'ID_SuppliesCategory'
})

supplies.belongsTo(suppliesCategory, {
    foreignKey: 'SuppliesCategory_ID',
    targetKey: 'ID_SuppliesCategory'
})
