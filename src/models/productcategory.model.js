import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { product } from './product.model.js'

export const productCategory = sequelize.define('ProductCategorys', {

    ID_ProductCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Name_ProductCategory: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre de la categoría de producto es requerido"
            },
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes.');
                }
            },  
            len: {
                args: [3, 30],
                msg: 'El nombre de la categoría de producto debe tener de 3 a 30 caracteres.'
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

productCategory.hasMany(product, {
    foreignKey: {
        name: 'ProductCategory_ID',
        allowNull: false,
    },
    sourceKey: 'ID_ProductCategory'
})
product.belongsTo(productCategory, {
    foreignKey: {
        name: 'ProductCategory_ID',
        allowNull: false,
    },
    targetKey: 'ID_ProductCategory'
})
