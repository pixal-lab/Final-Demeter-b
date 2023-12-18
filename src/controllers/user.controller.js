import { user } from '../models/user.model.js';
import { shopping } from '../models/shopping.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import { Op } from 'sequelize';
import { supplier } from '../models/supplier.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            where: {
                TypeUser_ID: 1
            }
        });
        res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const getUser = await user.findOne({ where: { ID_User: id } });

        if (!getUser) return res.status(404).json({ message: 'El usuario no existe' })

        res.json(getUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Document, Email } = req.body;

        const existingUser = await user.findOne({
            where: {
                [Op.or]: [{ Document }, { Email }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                error: 'Ya existe un usuario con la misma cédula o correo electrónico.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {

        const typesDocument = ['CC', 'CE', 'PB'];
        const { Type_Document, Document, Name_User, LastName_User, Password, Email, Role_ID } = req.body;

        if (!typesDocument.includes(Type_Document)) {
            return res.status(400).json({ mensaje: 'Tipo de documento no valido (CC, CE ó PB).' });
        }

        const passwordHast = await bcrypt.hash(Password, 10)
        const newUser = await user.create({
            Type_Document,
            Document,
            Name_User,
            LastName_User,
            Email,
            Password: passwordHast,
            Restaurant: null,
            TypeUser_ID: 1,
            Role_ID,
            State: true
        });

        const token = await createAccessToken({ id: newUser.ID_User });

        res.cookie('token', token);
        res.json({
            message: "Usuario creado correctamente",
            Nombre: newUser.Name_User,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {

    try {
        const { id } = req.params

        const { Type_Document, Document, LastName_User, Name_User, Email, Role_ID } = req.body
        
        const typesDocument = ['CC', 'CE', 'PB'];
        
        if (!typesDocument.includes(Type_Document)) {
            return res.status(400).json({ mensaje: 'Tipo de documento no valido (CC, CE ó PB).' });
        }

        const updateUser = await user.findByPk(id)

        updateUser.Type_Document = Type_Document
        updateUser.Document = Document
        updateUser.Name_User = Name_User
        updateUser.LastName_User = LastName_User
        updateUser.Role_ID = Role_ID
        updateUser.Email = Email

        await updateUser.save();

        return res.json(updateUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const toggleUserStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusUser = await user.findOne({
            where: { ID_User: id },
        });

        if (!statusUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        };

        statusUser.State = !statusUser.State;

        await statusUser.save();

        return res.json(statusUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const existUserInShoppings = await shopping.findOne({
            where: {
                User_ID: id
            }
        })

        if (existUserInShoppings) {
            return res.status(403).json({
                message: "El usuario no puede ser eliminado",
                useDelete: false
            })
        }

        await user.destroy({
            where: { ID_User: id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const existUserByEmailOrId = async (req, res) => {
    let existUser = false
    let hasError = false
    let existingUser;

    try {
        const { document, email, userType } = req.params;

        let model = user

        switch (userType) {
            case "supplier":
                model = supplier
                break
            default: break
        }

        existingUser = await model.findOne({
            where: {
                [Op.or]: [{ Document: document }, { Email: email }],
            },
        });

        if (existingUser) {
            existUser = true
        }


    } catch (error) {
        hasError = true
    }

    res.json({
        existUser,
        hasError,
        existingUser
    })
};
