const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token
        // Verifico
        if (!token) {
            throw new Error('No se ha enviado el token')
        }
        const decoded = jwt.verify(token, secret)
        if (!new Date(decoded.exp) > new Date()) {
            throw new Error('El token ha expirado')
        }
        next()
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { verifyToken }
