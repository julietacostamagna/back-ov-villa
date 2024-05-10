'use strict'
const { DataTypes } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

const TypeSex = sequelizeCoopm_v2.define(
    'TypeSexs',
    {
        description: DataTypes.STRING,
        status: DataTypes.BOOLEAN
    },
    {}
)

module.exports = TypeSex
