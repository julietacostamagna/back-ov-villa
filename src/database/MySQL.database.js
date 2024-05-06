const { Sequelize, QueryTypes } = require('sequelize')
const { coopm_v1, coopm_v2 } = require('../config/db.conf.js')

const sequelizeCoopm_v1 = new Sequelize(coopm_v1.database, coopm_v1.username, coopm_v1.password, {
    host: coopm_v1.host,
    port: coopm_v1.port,
    dialect: coopm_v1.dialect
})
const sequelizeCoopm_v2 = new Sequelize(coopm_v2.database, coopm_v2.username, coopm_v2.password, {
    host: coopm_v2.host,
    port: coopm_v2.port,
    dialect: coopm_v2.dialect
})

async function testConnection() {
    try {
        await sequelizeCoopm_v1.authenticate()
        await sequelizeCoopm_v2.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

async function initialzeModels() {
    const User = require('../models/User.model')
    const Personal_data = require('../models/Personal_data.model')
    const Address = require('../models/Address.model')
    const City = require('../models/City.model')
    const Person_legal = require('../models/Person_legal.model')
    const Person_physical = require('../models/Person_physical.model')
    const State = require('../models/State.model')
    const Street = require('../models/Street.model')
    // const Person_Address = require('../models/Person_Address.model')
    // const Street_City = require('../models/Street_City.model')
}
async function MainMigrate() {
    try {
        await sequelizeCoopm_v2.authenticate()
        await initialzeModels()
        await sequelizeCoopm_v2.sync()
        // const setupRelations = require('../models/Relations_foreing.js')
        // setupRelations(sequelizeCoopm_v2)
        console.log(true)
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
async function MigrationRelations() {
    try {
        await sequelizeCoopm_v2.authenticate()
        const setupRelations = require('../models/Relations_foreing.js')
        await setupRelations(sequelizeCoopm_v2)
        console.log(true)
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = {
    sequelizeCoopm_v1,
    sequelizeCoopm_v2,
    QueryTypes,
    testConnection,
    MainMigrate,
    MigrationRelations
}
