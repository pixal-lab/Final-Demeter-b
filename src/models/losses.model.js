import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";

export const losses = sequelize.define('Losses', {

    ID_Losses: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Unit: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La cantidad del insumo perdido es requerido"
            },
            isFloat: true,
            min: 0,
            max: 99999999
        },
    },

    Measure: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notNull: {
                msg: "La medida del insumo es requerido"
            }
        },
    },

    Reason: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El motivo es requerido"
            },
            customValidate(value) {
                if (!/^[A-ZÁÉÍÓÚÑa-záéíóúñ\s,.]*$/.test(value)) { 
                    throw new Error('Se permiten letras mayúscula, minúsculas, espacios, tildes, comas y puntos.');
                }
            },
            len: {
                args: [10, 250],
                msg: 'El motivo de la perdida debe tener de 10 a 250 caracteres.'
            }
        }
    }

}, {
    timestamps: false
});