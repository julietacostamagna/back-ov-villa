'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class State extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    State.init(
        {
            COD_PRO: DataTypes.BIGINT,
            DES_PRO: DataTypes.STRING,
            COD_AFIP: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'State'
        }
    )
    return State
}

// 'use strict'
// const { DataTypes } = require('sequelize')
// const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

// const State = sequelizeCoopm_v2.define(
//     'States',
//     {
//         COD_PRO: DataTypes.BIGINT,
//         DES_PRO: DataTypes.STRING,
//         COD_AFIP: DataTypes.STRING
//     },
//     {}
// )

// module.exports = State
