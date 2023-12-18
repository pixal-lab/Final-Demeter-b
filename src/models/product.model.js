import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { productDetail } from './productdetail.model.js'
import { saleDetail } from './saledetail.model.js'

export const product = sequelize.define('Products', {

    ID_Product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Name_Products: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre del producto es requerido"
            },
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes.');
                }
            },  
            len: {
                args: [3, 30],
                msg: 'El nombre del producto debe tener de 3 a 30 caracteres.'
            }
        }
    },

    Price_Product: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El precio del producto es requerido"
            },
            isFloat: true
        },
    },

    Image: {
        type: DataTypes.BLOB,
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

product.hasMany(productDetail, {
    foreignKey: {
        name: 'Product_ID',
        allowNull: false,
    },
    sourceKey: 'ID_Product'
})
productDetail.belongsTo(product, {
    foreignKey: {
        name: 'Product_ID',
        allowNull: false,
    },
    targetKey: 'ID_Product'
})

product.hasMany(saleDetail, {
    foreignKey: {
        name: 'Product_ID',
        allowNull: false,
    },
    sourceKey: 'ID_Product'
})
saleDetail.belongsTo(product, {
    foreignKey: {
        name: 'Product_ID',
        allowNull: false,
    },
    targetKey: 'ID_Product'
})