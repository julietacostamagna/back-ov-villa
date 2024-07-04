const { Sequelize, QueryTypes } = require('sequelize')
const config = require('../config/config.json')

const sequelizeCoopm_villa = new Sequelize(config.coopm_villa.database, config.coopm_villa.username, config.coopm_villa.password, {
	host: config.coopm_villa.host,
	port: config.coopm_villa.port,
	dialect: config.coopm_villa.dialect,
})

async function testConnection() {
	try {
		await sequelizeCoopm_villa.authenticate()
		await sequelizeCoopm_villa.authenticate()
		console.log('Connection has been established successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}

module.exports = {
	sequelizeCoopm_villa,
	QueryTypes,
	testConnection,
}
