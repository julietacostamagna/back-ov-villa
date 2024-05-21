const express = require('express')
const router = express.Router()
const { getNameCustomer, searchByCuit, searchByDNI } = require('../controllers/Procoop.controller')
const { dataUser, upgradeUser, updateUser } = require('../controllers/User.controller')
const { verifyToken } = require('../middleware/Auth.middleware')
const { logout } = require('../controllers/Auth.controller')
const { getListState, getListCity, getListStreet, newStreet } = require('../controllers/Location.controller')

router.get('/test', (req, res) => {
	res.json({ message: 'Test route' })
})

// router.get('/getUser', verifyToken)
// router.get('/newQuery', verifyToken, newQuery)
router.get('/logout', verifyToken, logout)
router.post('/searchDni', verifyToken, searchByDNI)
router.post('/searchCuit', verifyToken, searchByCuit)
// router.get('/users', migrationUser)
router.post('/dataUser', verifyToken, dataUser)
// router.get('/localidad', migrationCity)
// router.get('/provincia', migrationState)

//funciones para subier lvl2
router.post('/getCustomer', verifyToken, getNameCustomer)
router.patch('/upgradeLevelUser', verifyToken, upgradeUser)
router.get('/listState', verifyToken, getListState)
router.get('/listCity', verifyToken, getListCity)
router.get('/listStreet', verifyToken, getListStreet)
router.post('/addStreet', verifyToken, newStreet)

//EDICION DE USUARIO GENERAL
router.patch('/updateUser', verifyToken, updateUser)

module.exports = router
