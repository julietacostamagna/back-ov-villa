const express = require('express')
const router = express.Router()
const { migrationUser } = require('../controllers/User.controller')
// const { migrator1Up } = require('../controllers/migrations.controller')
const { login, testConect } = require('../controllers/Auth.controller')
const { verifyToken } = require('../middleware/Auth.middleware')


// RUTAS PARA AUHT

router.post('/login', login)
router.get('/users', migrationUser)
// router.get('/pruebaMigration', migrator1Up)

router.get('/testConect', testConect)

module.exports = router
