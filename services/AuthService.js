const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { sequelizeCoopm_v1 } = require('../database/MySQL.database')
const { sequelize, SequelizeOncativo } = require('../database/MSSQL.database')
const { db, db_coopm_v1 } = require('../models')
const { Sequelize } = require('sequelize')
const { sendEmail } = require('./EmailServices')

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
const registerUser = async (req, url) => {
    try {
        const pass = await bcrypt.hash(req.password, 10)
        const reg = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/
        if (req.email !== req.email_verify) throw new Error('Los emails no coinciden')
        if (req.password !== req.passwordVerify) throw new Error('Las contraseñas no coinciden')
        if (!reg.test(req.password)) throw new Error('La contraseña no tiene formato correcto')
        const tokenTemp = await crypto.randomBytes(64).toString('hex')
        const data = { ...req, password: pass, name_register: req.name, lastName_register: req.last_name, token_temp: tokenTemp }
        // const user = await db.User.create(data)
        const urlAthentificate = `${url}/login/${tokenTemp}/${user.id}`
        await sendEmail(data, urlAthentificate)
        return data
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            let listErrors = []
            error.errors.forEach((e) => {
                listErrors.push(e.message)
            })
            throw new Error(listErrors)
        } else {
            throw error
        }
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

module.exports = { testConection, login, newQuery, registerUser, logout }
