const { Sequelize } = require('sequelize')
const { procoop } = require('../config/db.conf.js')

sequelize = new Sequelize(procoop.database, procoop.username, procoop.password, {
    host: procoop.host,
    port: procoop.port,
    dialect: procoop.dialect,
    dialectOptions: {
        options: {
            encrypt: false,
        }
    }
})

module.exports = {
    sequelize,
}
