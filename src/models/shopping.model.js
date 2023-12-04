import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { shoppingDetail } from './shoppingdetail.model.js'

export const shopping = sequelize.define('Shoppings', {

    ID_Shopping:{
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    }, 

    Datetime: {
        type: DataTypes.DATE, 
        allowNull: false,
        validate: {
            notNull:{
                msg: "La fech de la compra es requerido"
            }
        }
    },

    Total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notNull:{
                msg: "El total de la compra es requerido"
            }, 
            isInt: true
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

shopping.hasMany(shoppingDetail, {
    foreignKey: 'Shopping_ID',
    sourceKey: 'ID_Shopping'
})

shoppingDetail.belongsTo(shopping, {
    foreignKey: 'Shopping_ID',
    targetKey: 'ID_Shopping'
})