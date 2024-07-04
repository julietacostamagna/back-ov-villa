const { Sequelize } = require('sequelize')
const configDb = require('../config/config.json')

SequelizeMorteros = new Sequelize(configDb.procoop.database, configDb.procoop.username, configDb.procoop.password, {
	host: configDb.procoop.host,
	port: configDb.procoop.port,
	dialect: configDb.procoop.dialect,
	dialectOptions: {
		options: {
			encrypt: false,
		},
	},
})

module.exports = {
	SequelizeMorteros
}
