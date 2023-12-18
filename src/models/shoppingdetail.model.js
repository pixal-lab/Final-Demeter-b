import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const shoppingDetail = sequelize.define('ShoppingDetails', {

    ID_ShoppingDetail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Lot: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La cantidad del insumo es requerido"
            },
            isFloat: true,
            min: 0,
            max: 9999
        },
    },

    Price_Supplier: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El precio del insumo es requerido"
            },
            isFloat: true
        },
    }
}, {
    timestamps: false
});
