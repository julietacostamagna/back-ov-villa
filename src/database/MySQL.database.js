const { Sequelize, QueryTypes } = require('sequelize')
const { coopm_v1, ofivirv2 } = require('../config/db.conf.js')

const sequelizeCoopm_v1 = new Sequelize(coopm_v1.database, coopm_v1.username, coopm_v1.password, {
    host: coopm_v1.host,
    port: coopm_v1.port,
    dialect: coopm_v1.dialect
})
const sequelizeOfivirv2 = new Sequelize(ofivirv2.database, ofivirv2.username, ofivirv2.password, {
    host: ofivirv2.host,
    port: ofivirv2.port,
    dialect: ofivirv2.dialect
})

async function testConnection() {
    try {
        await sequelizeCoopm_v1.authenticate()
        await sequelizeOfivirv2.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = {
    sequelizeCoopm_v1,
    sequelizeOfivirv2,
    QueryTypes,
    testConnection
}
