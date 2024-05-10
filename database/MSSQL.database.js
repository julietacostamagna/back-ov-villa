const { Sequelize } = require('sequelize')
const configDb = require('../config/config.json')

sequelize = new Sequelize(configDb.procoop.database, configDb.procoop.username, configDb.procoop.password, {
    host: configDb.procoop.host,
    port: configDb.procoop.port,
    dialect: configDb.procoop.dialect,
    dialectOptions: {
        options: {
            encrypt: false
        }
    }
})
const SequelizeOncativo = new Sequelize(configDb.oncativo.database, configDb.oncativo.username, configDb.oncativo.password, {
    host: configDb.oncativo.host,
    port: configDb.oncativo.port,
    dialect: configDb.oncativo.dialect,
    dialectOptions: {
        options: {
            encrypt: false
        }
    }
})
module.exports = {
    sequelize,
    SequelizeOncativo
}
