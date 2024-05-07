module.exports = () => {
    const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

    const User = require('./User.model')
    const Personal_data = require('./Personal_data.model')
    const Address = require('./Address.model')
    const State = require('./State.model')
    const City = require('./City.model')
    const Street = require('./Street.model')
    const Person_Address = require('./Person_Address.model')
    const Street_City = require('./Street_City.model')

    // Relaciones de Address
    Address.belongsTo(Street)
    Address.belongsTo(City)
    Address.belongsTo(State)

    // Relaciones de City
    City.belongsTo(State, {
        foreignKey: 'COD_PCI',
        targetKey: 'COD_PRO'
    })

    // Relaciones de tabla intermedia entre City y Street
    City.belongsToMany(Street, { through: Street_City })
    Street.belongsToMany(City, { through: Street_City })

    // Relaciones de User
    User.belongsTo(Personal_data)

    // Relaciones de tabla intermedia entre person y address
    Personal_data.belongsToMany(Address, { through: Person_Address })
    Address.belongsToMany(Personal_data, { through: Person_Address })

    // Sync todos los modelos
    sequelizeCoopm_v2.sync({ force: true })
}
