import { DataTypes } from "sequelize";
import { sequelize } from "../db/dataBase.js";
import { shopping } from './shopping.model.js'
import { sale } from './sale.model.js'

export const user = sequelize.define('Users', {

    ID_User: {
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
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'El documento es requerido'
            },
            len: {
                args: [3, 15],
                msg: 'El documento debe tener de 3 a 15 caracteres.'
            }
        }
    },

    Name_User: {
        type: DataTypes.STRING(30),
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
                args: [3, 30],
                msg: 'El nombre del usuario tener de 3 a 30 caracteres.'
            }
        }
    },

    LastName_User: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El apellido es requerido'
            },
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes.');
                }
            },
            len: {
                args: [3, 30],
                msg: 'El apellido del usuario tener de 3 a 30 caracteres.'
            }
        }
    },

    Email: {
        type: DataTypes.STRING(80),
        allowNull: true,
        unique: true,
        validate: {
            isEmail: {
                msg: 'El correo electrónico debe ser válido y contener el símbolo "@"'
            },
            len: {
                args: [10, 80],
                msg: 'El correo del usuario tener de 10 a 80 caracteres.'
            }
        }
    },

    Password: {
        type: DataTypes.STRING,
        allowNull: true

    },

    Restaurant: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
            customValidate(value) {
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s,.-]*$/.test(value)) {
                    throw new Error('Se permiten letras mayúsculas, minúsculas, espacios, tildes, coma, punto y guion.');
                }
            },
            len: {
                args: [3, 15],
                msg: 'El restaurante del mesero tener de 3 a 15 caracteres.'
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

user.hasMany(shopping, {
    foreignKey: {
        name: 'User_ID',
        allowNull: false,
    },
    sourceKey: 'ID_User'
})
shopping.belongsTo(user, {
    foreignKey: {
        name: 'User_ID',
        allowNull: false,
    },
    targetKey: 'ID_User'
})

user.hasMany(sale, {
    foreignKey: 'User_ID',
    sourceKey: 'ID_User'
})
sale.belongsTo(user, {
    foreignKey: 'User_ID',
    targetKey: 'ID_User'
})