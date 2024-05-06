module.exports = (sequelize) => {
    const User = require('./User.model')
    const Personal_data = require('./Personal_data.model')
    const Address_user = require('./Address.model')
    const City = require('./City.model')
    const State = require('./State.model')
    const Street = require('./Street.model')
    const Person_Address = require('./Person_Address.model')
    const Street_City = require('./Street_City.model')

    //tabla de relaciones
    Street_City.sync()
    Person_Address.sync()

    // Relaciones de Address
    Address_user.hasMany(Personal_data)
    Address_user.hasMany(Street)
    Address_user.hasMany(City)
    Address_user.hasMany(State)

    // Relaciones de City
    City.belongsTo(State, {
        foreignKey: 'COD_PCI',
        targetKey: 'COD_PRO'
    })
    City.belongsTo(Address_user)

    // Relaciones de tabla intermedia entre person y address
    Personal_data.belongsToMany(Address_user, { through: Person_Address })
    Address_user.belongsToMany(Personal_data, { through: Person_Address })

    // Relaciones de Personal_data
    Personal_data.hasMany(User)
    Personal_data.hasMany(Address_user)

    // Relaciones de State
    State.hasMany(City, {
        foreignKey: 'COD_PCI',
        sourceKey: 'COD_PRO'
    })
    State.belongsTo(Address_user)

    // Relaciones de tabla intermedia entre City y Street
    City.belongsToMany(Street, { through: Street_City })
    Street.belongsToMany(City, { through: Street_City })

    // Relaciones de Street
    Street.hasMany(City)
    Street.belongsTo(Address_user)

    // Relaciones de User
    User.belongsTo(Personal_data)
}
