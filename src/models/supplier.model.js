import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { shopping } from './shopping.model.js'

export const supplier = sequelize.define('Suppliers', {

    ID_Supplier: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Type_Document: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El tipo de documento es requerido"
            },
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes.');
                }
            },
            len: {
                args: [1, 5],
                msg: 'El tipo de documento deb tener de 1 a 5 caracteres.'
            }
        }
    },

    Document: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El documento es requerido'
            },
            len: {
                args: [3, 10],
                msg: 'El documento tener de 3 a 10 caracteres.'
            }
        }
    },

    Name_Supplier: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre es requerido'
            },
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes.');
                }
            },
            len: {
                args: [5, 50],
                msg: 'El nombre del proveedor debe tener de 5 a 50 caracteres.'
            }
        }
    },

    Name_Business: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
        // validate: {
        //     customValidate(value) {
        //         if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s,.-]*$/.test(value)) {
        //             throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes, coma, punto y guion.');
        //         }
        //     },
        //     len: {
        //         args: [4, 50],
        //         msg: 'El nombre de la empresa debe tener de 4 a 50 caracteres.'
        //     }
        // }
    },

    Phone: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true
    },

    Email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El correo es requerido'
            },
            isEmail: {
                msg: 'El correo electrónico debe ser válido y contener el símbolo "@"'
            }
        }
    },

    City: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La ciudad es requerido'
            },
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes.');
                }
            },
            len: {
                args: [3, 20],
                msg: 'La ciudad del proveedor debe tener de 3 a 20 caracteres.'
            }
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

supplier.hasMany(shopping, {
    foreignKey: {
        name: 'Supplier_ID',
        allowNull: false,
    },
    sourceKey: 'ID_Supplier'
})
shopping.belongsTo(supplier, {
    foreignKey: {
        name: 'Supplier_ID',
        allowNull: false,
    },
    targetKey: 'ID_Supplier'
})