'use strict'
const { DataTypes } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

const City = sequelizeCoopm_v2.define(
    'Cities',
    {
        COD_LOC: DataTypes.BIGINT,
        DES_LOC: DataTypes.STRING,
        COD_POS: DataTypes.BIGINT,
        COD_PCI: DataTypes.BIGINT
    },
    {}
)

module.exports = City
