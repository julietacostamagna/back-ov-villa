const { DataTypes } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const Address = require('./Address.model')
const Personal_data = require('./Personal_data.model')

const Person_Address = sequelizeCoopm_v2.define('Person_Addresses', {
    AddressId: {
        type: DataTypes.BIGINT,
        references: {
            model: Address, // 'Movies' would also work
            key: 'id'
        }
    },
    PersonaDataId: {
        type: DataTypes.BIGINT,
        references: {
            model: Personal_data, // 'Actors' would also work
            key: 'id'
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})
Personal_data.belongsToMany(Address, { through: Person_Address })
Address.belongsToMany(Personal_data, { through: Person_Address })
module.exports = Person_Address
