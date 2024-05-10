'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class TypeSex extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    TypeSex.init(
        {
            description: DataTypes.STRING,
            status: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'TypeSex'
        }
    )
    return TypeSex
}

// 'use strict'
// const { DataTypes } = require('sequelize')
// const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

// const TypeSex = sequelizeCoopm_v2.define(
//     'TypeSexs',
//     {
//         description: DataTypes.STRING,
//         status: DataTypes.BOOLEAN
//     },
//     {}
// )

// module.exports = TypeSex
