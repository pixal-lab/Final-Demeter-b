import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const productDetail = sequelize.define('ProductDetails', {

    ID_ProductDetail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Lot_ProductDetail: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La cantidad del insumo requerido"
            },
            isFloat: {
                msg: "La cantidad debe ser un número válido (puede ser decimal)"
            },
            min: {
                args: [0],
                msg: "La cantidad no puede ser menor que 0"
            },
            max: {
                args: [999],
                msg: "La cantidad no puede ser mayor que 999"
            }
        }
    }
}, {
    timestamps: false
});
