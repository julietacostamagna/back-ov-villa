const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sequelizeCoopm_v1 } = require('../database/MySQL.database')
const { sequelize, SequelizeOncativo } = require('../database/MSSQL.database')
const UserDesarrollo = require('../models/userDesarrollo')
const crypto = require('crypto')

//Funcion para Generacion de la firma del token
const generateToken = () => {
    return crypto.randomBytes(64).toString('hex')
}

// Funcion para firmar el token
const signToken = (user) => {
    const secret = generateToken()
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

const login = async (email, password) => {
    const user = await UserDesarrollo.findOne({ where: { email: email } })
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
const testConectionOncativo = async () => {
    try {
        await SequelizeOncativo.authenticate()
    } catch (error) {
        throw new Error('NO SE PUDO CONECTAR')
    }
}

module.exports = {
    testConection,
    testConectionOncativo,
    login
}
