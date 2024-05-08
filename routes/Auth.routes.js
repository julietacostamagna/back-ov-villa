const express = require('express')
const router = express.Router()
const AuthService = require('../services/AuthService')
const { migrationUser, migrationCityProcoop } = require('../controllers/User.controller')

router.post('/login', async (req, res) => {
    try {
        const { mail, password } = req.body
        const email = { email: mail }
        const token = await AuthService.login(email, password)
        res.json({ token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.get('/users', migrationUser)
router.get('/localidad', migrationCityProcoop)

router.get('/testConect', async (req, res) => {
    try {
        await AuthService.testConection()
        res.json({ message: 'Conexión exitosa' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
