// 'use strict'
// const { Model } = require('sequelize')
// module.exports = (sequelize, DataTypes) => {
//     class User extends Model {
//         /**
//          * Helper method for defining associations.
//          * This method is not a part of Sequelize lifecycle.
//          * The `models/index` file will call this method automatically.
//          */
//         static associate(models) {
//             // define association here
//         }
//     }
//     User.init(
//         {
//             name_register: DataTypes.STRING,
//             lastName_register: DataTypes.STRING,
//             email: DataTypes.STRING,
//             email_verified: DataTypes.DATE,
//             password: DataTypes.STRING,
//             remember_token: DataTypes.STRING,
//             token_temp: DataTypes.STRING
//         },
//         {
//             sequelize,
//             modelName: 'User'
//         }
//     )
//     return User
// }

'use strict'
const { DataTypes } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

const User = sequelizeCoopm_v2.define(
    'Users',
    {
        name_register: DataTypes.STRING,
        lastName_register: DataTypes.STRING,
        email: DataTypes.STRING,
        email_verified: DataTypes.DATE,
        password: DataTypes.STRING,
        remember_token: DataTypes.STRING,
        token_temp: DataTypes.STRING
    },
    {}
)

module.exports = User
