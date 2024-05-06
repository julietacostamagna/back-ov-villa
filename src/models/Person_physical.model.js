const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const User = require('./User.model')

class Person_physical extends Model {}
Person_physical.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        type_dni: { type: DataTypes.INTEGER },
        num_dni: { type: DataTypes.INTEGER },
        burn_date: { type: DataTypes.DATE },
        validation_renaper: { type: DataTypes.INTEGER, isNull: true }
    },
    {
        sequelize: sequelizeCoopm_v2,
        modelName: 'Person_physical'
    }
)
// Person_physical.hasMany(User)
module.exports = Person_physical
