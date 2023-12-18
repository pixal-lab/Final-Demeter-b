const nodemailer = require('nodemailer');

// Configuración del transportador (nodemailer)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xoxoandburguer6@gmail.com', // Tu dirección de correo
        pass: 'xtrp vtwq whsr szwc' // Tu contraseña de correo
    }
});

module.exports = transporter; 