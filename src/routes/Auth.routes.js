const express = require('express')
const router = express.Router()
const AuthService = require('../services/AuthService')
const { MainMigrate, MigrationRelations } = require('../database/MySQL.database')

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
router.get('/migracion', async (req, res) => {
    try {
        await MainMigrate()
        res.json({ msj: 'migracion completa' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.get('/relation', async (req, res) => {
    try {
        await MigrationRelations()
        res.json({ msj: 'migracion de relaciones completa' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
