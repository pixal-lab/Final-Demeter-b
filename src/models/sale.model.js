import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { saleDetail } from './saledetail.model.js'

export const sale = sequelize.define('Sales', {

    ID_Sale:{
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },

    StatePay: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El estado de pago es requerido'
            }
        }
    },

    QuickSale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate: {
            notNull:{
                msg: "El estado de venta rapida es requerido"
            }
        }
    },

    Discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            notNull:{
                msg: "El descuento es requerido"
            }
        }
    },

    SubTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            notNull:{
                msg: "El subtotal es requerido"
            }
        }
    },

    Total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            notNull:{
                msg: "El precio del producto es requerido"
            }, 
            isFloat: true
        }
    },

    Payment: {
        type: DataTypes.STRING(30),
        allowNull: true
    },

    State: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El estado de la venta es requerido'
            }
        }
    }
}, {
    timestamps: true
});

sale.hasMany(saleDetail, {
    foreignKey: {
        name: 'Sale_ID',
        allowNull: false,
    },
    sourceKey: 'ID_Sale',
})
saleDetail.belongsTo(sale, {
    foreignKey: {
        name: 'Sale_ID',
        allowNull: false,
    },
    targetKey: 'ID_Sale',
})