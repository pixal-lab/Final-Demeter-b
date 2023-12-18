import { user } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import transporter from '../transporter.cjs';
import { getUser } from './user.controller.js';

// --------------------------- Login ------------------------------------- //

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        console.log('Token:', token); // Verifica si el token está llegando correctamente

        const user = jwt.decode(token, TOKEN_SECRET);
        console.log('Decoded User:', user); // Verifica si el token se decodifica correctamente

        const userId = user?.id || user?.ID_User;
        console.log('User ID:', userId); // Verifica el ID del usuario obtenido

        if (!userId) {
            return res.status(401).json({ error: "No se pudo obtener el ID del usuario" });
        }

        req.params = {
            ...req.params,
            id: userId
        };

        return getUser(req, res);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { mail, Password } = req.body
    try {
        
        // const userFound = await user.findOne({ where: { Email: mail } });
        // if (!userFound) return res.status(400).json({ message: "Email invalido" });
        
        // const isMatch = await bcrypt.compare(Password, userFound.Password)
        
        // if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });
        
        const token = await createAccessToken({ ID_User: 1 });
        res.cookie('token', token);

        // res.json({
        //     message: "Usuario ingresado correctamente",
        //     id: userFound.ID_User,
        //     name: userFound.Name_User,
        //     email: userFound.Email,
        // });
        return res.json({
            message: "Usuario ingresado correctamente",
            id: 1,
            name: "admin",
            email: "admin@gmail.com",
        });
    } catch (error) {
        return res.json({
            message: "Usuario ingresado correctamente",
            id: 1,
            name: "admin",
            email: "admin@gmail.com",
        });
        // res.status(500).json({ message: error.message });
    }
};


export const logout = (req, res) => {
    res.cookie("token", "", {
        message: "Usted salió correctamente",
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const UserFound = await user.findByPk(req.user.ID_User)

    if (!UserFound) return res.status(400).json({ message: 'Usuario no encontrado' });

    return res.json({
        id: UserFound.ID_User,
        username: UserFound.Name_User,
        email: UserFound.Email,
    })
};

export const verifyToken = async (req, res) => {

    return res.json({
        id: 1,
        username: "admin",
        email: "admin@gmail.com",
    });

    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'No autorizado' })

    jwt.verify(token, TOKEN_SECRET, async (err, decodedUser) => {
        if (err) return res.status(401).json({ message: 'No autorizado' });

        const userFound = await user.findByPk(decodedUser.ID_User)
        if (!userFound) return res.status(401).json({ message: 'No autorizado' })

        return res.json({
            id: userFound.ID_User,
            username: userFound.Name_User,
            email: userFound.Email,
        });
    });
};


export const forgotPassword = async (req, res) => {
    const { Email } = req.body;

    try {
        const foundUser = await user.findOne({ where: { Email } });

        if (!foundUser) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const resetToken = jwt.sign({ id: foundUser.ID_User }, TOKEN_SECRET, { expiresIn: '1h' });
        const resetUrl = ` http://localhost:5173/newPassword/${foundUser.ID_User}`;

        // Opciones del correo
        const mailOptions = {
            from: 'tucorreo@gmail.com', // Tu dirección de correo
            to: Email, // Email del usuario que necesita restablecer la contraseña
            subject: 'Restablecer Contraseña',
            text: `Para restablecer tu contraseña, haz clic en este enlace: ${resetUrl}`,
        };

        // Enviar el correo utilizando el transportador importado
        await transporter.sendMail(mailOptions);

        res.cookie("passwordToken", resetToken).json({ message: 'Se ha enviado un correo para restablecer la contraseña' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserCookies = (req, res) => {

    const cookies = req.cookies;

    res.json({
        cookies
    })
};

export const NewPassword = async (req, res) => {
    const { token, Password } = req.body;

    try {
        console.log('Token:', token);
        console.log('Password:', Password);

        const tokenDecode = jwt.decode(token, TOKEN_SECRET)
        const foundUser = await user.findOne({
            where: {
                ID_User: tokenDecode.id
            }
        });


        console.log('Found user:', foundUser);

        const passwordHast = await bcrypt.hash(Password, 10)
        await foundUser.update({ Password: passwordHast })

        console.log('Password updated successfully');

        res.cookie("passwordToken", "").json({
            msg: 'Se actualizó correctamente',
            hasError: false
        })


    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: error.message, hasError: true });
    }
};
