const jwt = require('jsonwebtoken');

const verifyToken = (req, res) => {
    try {
        const cookie = req.cookies;
        // Verifico 
        if(!cookie.token) {
            throw new Error('No se ha enviado el token');
        }
        return
    } catch (err) {
        console.log('El token es inválido:', err);
        return null;
    }
}

module.exports = { verifyToken }