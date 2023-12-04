import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const saleDetail = sequelize.define('SaleDetails', {

    ID_SaleDetail: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    }, 

    Lot: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        defaultValue: 1,
        validate: {
            notNull:{
                msg: "La cantidad del producto es requerido."
            }, 
            isInt: true,
            min: 0,
            max: 9999
        },
    }
}, {
    timestamps: false
});
