import { user } from '../models/user.model.js';
import { sale } from '../models/sale.model.js';
import { Op } from 'sequelize';

export const getWaiters = async (req, res) => {
    try {
        const users = await user.findAll({
            where: {
                TypeUser_ID: 2
            }
        });
        res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getWaiterBySale = async (req, res) => {

    try {
        const { id } = req.params

        const WaiterSale = await sale.findAll({
            where: {
                User_ID: id
            }
        });

        if (!WaiterSale) return res.status(404).json({ message: 'El mesero no existe' })

        res.json(WaiterSale);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createWaiter = async (req, res) => {

    try {

        const { Type_Document, Document, Name_User, LastName_User, Restaurant } = req.body;

        const typesDocument = ['CC', 'CE', 'PB'];

        if (!typesDocument.includes(Type_Document)) {
            return res.status(400).json({ mensaje: 'Tipo de documento no valido (CC, CE ó PB).' });
        }
        const newUser = await user.create({
            Type_Document,
            Document,
            Name_User,
            LastName_User,
            Restaurant,
            TypeUser_ID: 2,
            Email: null,
            Password: null,
            Role_ID: null,
            State: true
        });

        res.json({
            message: "Mesero creado correctamente",
            Nombre: newUser.Name_User,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const duplicateWaiter = async (req, res, next) => {
    try {
        const { Document } = req.body;

        const existingWaiter = await user.findOne({
            where: {
                [Op.or]: [{ Document }],
            },
        });

        if (existingWaiter) {
            return res.status(400).json({
                error: 'Ya existe un usuario con la misma cédula',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateWaiter = async (req, res) => {
    const { id } = req.params

    try {
        const { Type_Document, Document, Name_User, LastName_User, Restaurant } = req.body;

        const typesDocument = ['CC', 'CE', 'PB'];

        if (!typesDocument.includes(Type_Document)) {
            return res.status(400).json({ mensaje: 'Tipo de documento no valido (CC, CE ó PB)' });
        }

        const updateWaiter = await user.findByPk(id)

        updateWaiter.Type_Document = Type_Document
        updateWaiter.Document = Document
        updateWaiter.Name_User = Name_User
        updateWaiter.LastName_User = LastName_User
        updateWaiter.Restaurant = Restaurant

        await updateWaiter.save();

        return res.json(updateWaiter);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
