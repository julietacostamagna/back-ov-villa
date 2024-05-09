const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sequelizeCoopm_v1 } = require('../database/MySQL.database')
const UserDesarrollo = require('../models/userDesarrollo')
const crypto = require('crypto');

//Generacion de la firma del token
const secret = crypto.randomBytes(32).toString('hex');

console.log(secret);

const signToken = (user) => {
    return jwt.sign(
        {
            iss: 'oficina',
            sub: user.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        },
        secret
    )
}

exports.login = async (email, password) => {
    const user = await UserDesarrollo.findOne({ where: { email: email } })
    console.log(user.dataValues)
    if (!user) {
        throw new Error('El usuario no existe')
    }
    let hash = user.password
    hash = hash.replace(/^\$2y(.+)$/i, '$2a$1')
    const isMatch = await bcrypt.compare(password, hash)
    if (!isMatch) {
        throw new Error('Contraseña incorrecta')
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

exports.testConection = testConection
