const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

class User extends Model {}
User.init(
    {
        email: { type: DataTypes.STRING, email: true, unique: true },
        email_verified: DataTypes.DATE,
        password: { type: DataTypes.STRING, is: /^(?=.*[A-Z]).{6,}$/ },
        remember_token: { type: DataTypes.STRING, allowNull: true },
        token_temp: { type: DataTypes.STRING, allowNull: true }
    },
    {
        sequelize: sequelizeCoopm_v2
    }
)

module.exports = User
