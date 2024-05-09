const express = require('express')
const router = express.Router()
const { migrationCity, migrationState } = require('../controllers/Procoop.controller')
const { migrationUser } = require('../controllers/User.controller')

router.get('/test', (req, res) => {
    res.json({ message: 'Test route' })
})

router.get('/users', migrationUser)
router.get('/localidad', migrationCity)
router.get('/provincia', migrationState)

module.exports = router
