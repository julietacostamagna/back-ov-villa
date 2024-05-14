const express = require('express')
const router = express.Router()
const { migrationCity, migrationState } = require('../controllers/Procoop.controller')
const { migrationUser } = require('../controllers/User.controller')
const { verifyToken } = require('../middleware/Auth.middleware')
const { newQuery, logout } = require('../controllers/Auth.controller')

router.get('/test', (req, res) => {
    res.json({ message: 'Test route' })
})


router.get('/getUser', verifyToken,)
router.get('/newQuery', verifyToken, newQuery)
router.get('/logout', verifyToken, logout)
router.get('/users', migrationUser)
router.get('/localidad', migrationCity)
router.get('/provincia', migrationState)

module.exports = router
