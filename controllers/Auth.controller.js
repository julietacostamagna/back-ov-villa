const AuthService = require('../services/AuthService')
const crypto = require('crypto')
const { verifyEmail, sendRecoverPass } = require('../services/EmailServices')
const { getUserxEmail, setTokenTemporal, verifyEmailToken, RegisterAcept } = require('../services/UserService')
const testConect = async (req, res) => {
    try {
        await AuthService.testConection()
        res.json({ message: 'Conexión exitosa' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await AuthService.login(email, password)

        res.json({ token })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

const newQuery = async (req, res) => {
    try {
        const users = await AuthService.newQuery()
        res.send(users)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

const register = async (req, res) => {
    try {
        const fullUrl = req.protocol + '://' + req.get('host')
        const user = await AuthService.registerUser(req.body, fullUrl)
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const verifyRegister = async (req, res) => {
    try {
        const { token_temp, id } = req.query
        if (!token_temp || !id) throw new Error('No se enviaron los parametros necesarios')
        const isValidToken = await verifyEmailToken(token_temp, id)
        if (isValidToken.error) throw new Error('El enlace es invalido o ya fue utilizado')
        await RegisterAcept(isValidToken)
        res.status(200).json({ message: 'Se Verifico correctamente el usuario' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const password_recover = async (req, res) => {
    try {
        const { email } = req.query
        if (!email) throw new Error('No se enviaron los parametros necesarios')
        const user = await getUserxEmail(email)
        const tokenTemp = await crypto.randomBytes(64).toString('hex')
        // Genero url pra click en email para redireccionar y que cambie la password
        const fullUrl = `${req.protocol}://${req.get('host')}/ChangePassword/${tokenTemp}/${user.id}`
        // Enviar correo electronico con el link para resetear la contraseña
        await sendRecoverPass(user.name, user.email, fullUrl)
        // Guardar en BD el token temporal y su fecha de expiracion
        await setTokenTemporal(user.id, tokenTemp)
        res.status(200).json({ message: `Se ha enviado un mensaje a tu cuenta de correo electrónico`, url: fullUrl })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { login, testConect, register, newQuery, verifyRegister, password_recover }
