import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { supplies } from './supplies.model.js'

export const suppliesCategory = sequelize.define('SuppliesCategorys', {

    ID_SuppliesCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Name_SuppliesCategory: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre de la categoría de insumo es requerido"
            },
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes.');
                }
            },  
            len: {
                args: [3, 30],
                msg: 'El nombre de la categoría de insumo debe tener de 3 a 30 caracteres.'
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
    foreignKey: {
        name: 'SuppliesCategory_ID',
        allowNull: false,
    },
    sourceKey: 'ID_SuppliesCategory'
})
supplies.belongsTo(suppliesCategory, {
    foreignKey: {
        name: 'SuppliesCategory_ID',
        allowNull: false,
    },
    targetKey: 'ID_SuppliesCategory'
})
