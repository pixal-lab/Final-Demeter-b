import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { productDetail } from './productdetail.model.js'
import { saleDetail } from './saledetail.model.js'

export const product =  sequelize.define('Products', {

    ID_Product: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    }, 

    Name_Products: {
        type: DataTypes.STRING(30), 
        allowNull: false, 
        validate:{
            notNull:{
                msg: "El nombre del producto es requerido"
            },
            customValidate(value) {
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('El nombre del producto debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            }
        }
    },

    Price_Product: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull:{
                msg: "El precio del producto es requerido"
            }, 
            isInt: true
        },
    },

    Image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            
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

product.hasMany(productDetail, {
    foreignKey: 'Product_ID',
    sourceKey: 'ID_Product'
})

productDetail.belongsTo(product, {
    foreignKey: 'Product_ID',
    targetKey: 'ID_Product'
})

product.hasMany(saleDetail, {
    foreignKey: 'Product_ID',
    sourceKey: 'ID_Product'
})

saleDetail.belongsTo(product, {
    foreignKey: 'Product_ID',
    targetKey: 'ID_Product'
})