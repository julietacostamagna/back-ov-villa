const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sequelizeCoopm_v1 } = require('../database/MySQL.database')
const UserDesarrollo = require('../models/userDesarrollo')
const User = require('../models/user')

const secret = process.env.SECRET

async function newQuery() {
    try {
        const users = await User.findAll()
        console.log(users)
    } catch (error) {
        console.error('ERROR DE DATABASE:', error)
    }

}

// Funcion para firmar el token
const signToken = (user) => {
    return jwt.sign(
        {
            iss: 'oficina',
            sub: user.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1),
            email: user.email,
            level: user.level,
            darkMode: user.dark
        },
        secret
    )
}

login = async (email, password) => {
    const user = await UserDesarrollo.findOne({ where: { email: email } })
    if (!user) {
        throw new Error('El usuario o la contraseña son incorrectas')
    }
    let hash = user.password
    hash = hash.replace(/^\$2y(.+)$/i, '$2a$1')
    const isMatch = await bcrypt.compare(password, hash)
    if (!isMatch) {
        throw new Error('El usuario o la contraseña son incorrectas incorrecta')
    }
    return signToken(user)
}

const testConection = async () => {
    try {
        await sequelizeCoopm_v1.authenticate()
    } catch (error) {
        console.error('ERROR DE DATABASE:', error)
    }
}

module.exports = { testConection, login, newQuery }
