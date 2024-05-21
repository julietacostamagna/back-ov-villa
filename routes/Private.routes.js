const express = require('express')
const router = express.Router()
const { migrationCity, migrationState, getNameCustomer } = require('../controllers/Procoop.controller')
const { migrationUser, dataUser, upgradeUser, updateUser, searchUserxDni } = require('../controllers/User.controller')
const { verifyToken } = require('../middleware/Auth.middleware')
const { newQuery, logout } = require('../controllers/Auth.controller')
const { getListState, getListCity, getListStreet, newStreet, getAddress } = require('../controllers/Location.controller')

router.get('/test', (req, res) => {
	res.json({ message: 'Test route' })
})

// router.get('/getUser', verifyToken)
// router.get('/newQuery', verifyToken, newQuery)
router.get('/logout', verifyToken, logout)

// router.get('/users', migrationUser)
router.post('/dataUser', verifyToken, dataUser)
// router.get('/localidad', migrationCity)
// router.get('/provincia', migrationState)

//funciones para subier lvl2
router.post('/getCustomer', verifyToken, getNameCustomer)
router.patch('/upgradeLevelUser', verifyToken, upgradeUser)
router.patch('/updateCustomer', verifyToken, updateUser)

// Funciones de localidad
router.get('/listState', verifyToken, getListState)
router.get('/listCity', verifyToken, getListCity)
router.get('/listStreet', verifyToken, getListStreet)
router.post('/addStreet', verifyToken, newStreet)
router.post('/getAddress', verifyToken, getAddress)

// Funcion para recuperar toda la informacion del usuario por dni
router.get('/searchUserxDni', verifyToken, searchUserxDni)

module.exports = router
