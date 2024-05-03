const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

class User extends Model {}
User
    .init
    // {
    //     id: {
    //         type: DataTypes.INTEGER,
    //         allowNull: false,
    //         primaryKey: true
    //     },
    //     email:{},
    //     name: { type: DataTypes.STRING },
    //     id_api: { type: DataTypes.BIGINT },
    //     id_procoop: { type: DataTypes.BIGINT }
    // },
    // {
    //     sequelize: sequelizeCoopm_v2,
    //     modelName: 'User'
    //     // tableName: 'user',
    //     // timestamps: false
    // }
    ()
User.hasMany(City)
module.exports = User
