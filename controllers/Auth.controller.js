const { db, db_coopm_v1 } = require('../models')
const AuthService = require('../services/AuthService')
const bcrypt = require('bcrypt')
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
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}
const register = async (req, res) => {
    try {
        const pass = await bcrypt.hash(req.body.password, 10)
        console.log(pass)
        // const data = { ...req.body, password: bcryt(req.body.password), name_register: req.body.name, lastName_register: req.body.last_name }
        // const user = await db.User.create(data)
        // const listuser = await db_coopm_v1.UserDesarrollo.findAll()
        // const listuser = await db.State.findAll()
        res.json(pass)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}
module.exports = { login, testConect, register }
