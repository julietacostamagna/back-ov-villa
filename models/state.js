'use strict'
const { DataTypes } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

const State = sequelizeCoopm_v2.define(
    'States',
    {
        COD_PRO: DataTypes.BIGINT,
        DES_PRO: DataTypes.STRING,
        COD_AFIP: DataTypes.STRING
    },
    {}
)

module.exports = State
