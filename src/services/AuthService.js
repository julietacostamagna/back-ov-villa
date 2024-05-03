const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User.model')

const signToken = (user) => {
    return jwt.sign(
        {
            iss: 'oficina',
            sub: user.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        },
        'Cspmdesarrollo03'
    )
}

exports.login = async (email, password) => {
    const user = await User.findOne({ where: email })
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
