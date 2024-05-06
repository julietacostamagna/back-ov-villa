const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const Personal_data = require('./Personal_data.model')
const Street = require('./Street.model')
const City = require('./City.model')
const State = require('./State.model')

class Address extends Model {}
Address.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        number_address: { type: DataTypes.STRING },
        floor: { type: DataTypes.STRING },
        dpto: { type: DataTypes.INTEGER },
        postal_code: { type: DataTypes.DATE },
        google_address: { type: DataTypes.STRING, isNull: true },
        owner_name: { type: DataTypes.STRING, isNull: true },
        owner_last_name: { type: DataTypes.STRING, isNull: true },
        owner_num_dni: { type: DataTypes.STRING, isNull: true }
    },
    {
        sequelize: sequelizeCoopm_v2,
        modelName: 'Address'
    }
)

// RELACIONES FORANEAS
// Falta hacer relacion con datos catastrales.
Address.hasMany(Personal_data)
Address.hasMany(Street)
Address.hasMany(City)
Address.hasMany(State)
module.exports = Address
