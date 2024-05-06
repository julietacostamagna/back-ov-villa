const express = require('express')
const router = express.Router()
const AuthService = require('../services/AuthService')
const ProcopService = require('../services/ProcopService')
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
// router.get('/migracion', async (req, res) => {
//     try {
//         await MainMigrate()
//         res.json({ msj: 'migracion completa' })
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// })
// router.get('/relation', async (req, res) => {
//     try {
//         await MigrationRelations()
//         res.json({ msj: 'migracion de relaciones completa' })
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// })

router.get('/testConect', async (req, res) => {
    try {
        await ProcopService.testConection()
        res.json({ message: 'Conexión exitosa' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/api/procoop/personaPorDni', async (req, res) => {
    try {
        // Body: { dni: '12345678' } | {cuit: '1-12345678-90' }
        const { dni, cuit } = req.body
        const persona = dni ? await ProcopService.personaPorDni(dni) : await ProcopService.empresaPorCuit(cuit)
        res.json(persona)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router

