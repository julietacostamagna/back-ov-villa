'use strict'
const { DataTypes } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

const Address = sequelizeCoopm_v2.define(
    'Addresses',
    {
        number_address: DataTypes.STRING,
        floor: DataTypes.STRING,
        dpto: DataTypes.INTEGER,
        postal_code: DataTypes.DATE,
        owner_name: DataTypes.STRING,
        owner_last_name: DataTypes.STRING,
        owner_num_dni: DataTypes.STRING,
        StreetId: DataTypes.INTEGER,
        CityId: DataTypes.INTEGER,
        StateId: DataTypes.INTEGER
    },
    {}
)

module.exports = Address
