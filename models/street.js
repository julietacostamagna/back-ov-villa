'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Street extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Street.belongsToMany(models.City, {
                through: 'Street_City',
                as: 'Cities',
                foreignKey: 'streetId'
            })
            // define association here
        }
    }
    Street.init(
        {
            name: DataTypes.STRING,
            id_api: DataTypes.BIGINT,
            id_procoop: DataTypes.BIGINT
        },
        {
            sequelize,
            modelName: 'Street'
        }
    )
    return Street
}

// 'use strict'
// const { DataTypes } = require('sequelize')
// const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

// const Street = sequelizeCoopm_v2.define(
//     'Streets',
//     {
//         name: DataTypes.STRING,
//         id_api: DataTypes.BIGINT,
//         id_procoop: DataTypes.BIGINT
//     },
//     {}
// )

// module.exports = Street
