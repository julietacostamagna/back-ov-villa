const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { sequelizeCoopm_v1 } = require('../database/MySQL.database')
const { sequelize, SequelizeOncativo } = require('../database/MSSQL.database')
const { db, db_coopm_v1 } = require('../models')

const secret = process.env.SECRET

async function newQuery() {
    try {
        const users = await db.User.findAll()
        return users
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
            // exp: new Date().setDate(new Date().getDate() + 1),
            email: user.email,
            level: user.level,
            darkMode: user.dark
        },
        secret
    )
}

const login = async (email, password) => {
    const user = await db_coopm_v1.UserDesarrollo.findOne({ where: { email: email } })
    if (!user) {
        throw new Error('El usuario o la contraseña son incorrectas')
    }
    let hash = user.password
    hash = hash.replace(/^\$2y(.+)$/i, '$2a$1')
    const isMatch = await bcrypt.compare(password, hash)
    if (!isMatch) {
        throw new Error('El usuario o la contraseña son incorrectas')
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

const logout = async (req, res) => {
    try {
        const id = req.cookies.token.sub
        const user = await db_coopm_v1.UserDesarrollo.findOne({ where: { id: id } })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { testConection, login, newQuery, logout }
