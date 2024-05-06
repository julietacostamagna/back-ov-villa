const { DataTypes } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const City = require('./City.model')
const Street = require('./Street.model')

const Street_City = sequelizeCoopm_v2.define('Street_Cities', {
    CityId: {
        type: DataTypes.BIGINT,
        references: {
            model: City, // 'Movies' would also work
            key: 'id'
        }
    },
    StreetId: {
        type: DataTypes.BIGINT,
        references: {
            model: Street, // 'Actors' would also work
            key: 'id'
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})
City.belongsToMany(Street, { through: Street_City })
Street.belongsToMany(City, { through: Street_City })
module.exports = Street_City
