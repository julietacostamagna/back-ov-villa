const jwt = require('jsonwebtoken');

const verifyToken = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.log('El token es inválido:', err);
        return null;
    }
}