import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const saleDetail = sequelize.define('SaleDetails', {

    ID_SaleDetail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Lot: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La cantidad del producto es requerido."
            },
            isFloat: true,
            min: 0,
            max: 9999
        },
    }

}, {
    timestamps: false
});
