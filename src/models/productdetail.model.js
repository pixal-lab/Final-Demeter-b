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
            notNull:{
                msg: "La cantidad del insumo requerido"
            }, 
            isInt: true, 
            min: 0,
            max: 9999
        },
    },

    Measure: {
        type: DataTypes.STRING(15),
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
