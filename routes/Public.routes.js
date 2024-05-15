const express = require('express')
const router = express.Router()
const { migrationUser, tokenVerify } = require('../controllers/User.controller')
// const { migrator1Up } = require('../controllers/migrations.controller')
const { login, testConect, register, newQuery, verifyRegister, password_recover } = require('../controllers/Auth.controller')
const { verifyToken } = require('../middleware/Auth.middleware')
const { sendEmail } = require('../services/EmailServices')

// RUTAS PARA AUHT

router.post('/login', login)
router.post('/register', register)
router.post('/validationUser', verifyRegister)
router.post('/password_recover', password_recover)
router.post('/existToken', tokenVerify)

router.get('/users', migrationUser)
router.get('/email', sendEmail)
// router.get('/pruebaMigration', migrator1Up)

router.get('/testConect', testConect)

module.exports = router
