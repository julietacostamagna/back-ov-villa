const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User.model')
const { sequelize } = require('../database/MSSQL.database')

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

// exports.login = async (email, password) => {
//     const user = await User.findOne({ where: email })
//     if (!user) {
//         throw new Error('El usuario no existe')
//     }
//     let hash = user.password
//     hash = hash.replace(/^\$2y(.+)$/i, '$2a$1')
//     const isMatch = await bcrypt.compare(password, hash)
//     if (!isMatch) {
//         throw new Error('Contraseña incorrecta')
//     }

//    return signToken(user)
//}

const testConection = async () => {
    try {
        await sequelize.authenticate()
        console.log('CONEXIÓN EXITOSA')
    } catch (error) {
        console.error('ERROR DE MIERDACOOP:', error)
    }
}

exports.testConection = testConection