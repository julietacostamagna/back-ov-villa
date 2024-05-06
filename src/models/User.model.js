const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const Personal_data = require('./Personal_data.model')

class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        email: { type: DataTypes.STRING, email: true, unique: true },
        email_verified: DataTypes.DATE,
        password: { type: DataTypes.STRING, is: /^(?=.*[A-Z]).{6,}$/ },
        remember_token: { type: DataTypes.STRING, isNull: true },
        token_temp: { type: DataTypes.STRING, isNull: true }
    },
    {
        sequelize: sequelizeCoopm_v2,
        modelName: 'User'
        // tableName: 'user',
        // timestamps: false
    }
)
User.belongsTo(Personal_data)
module.exports = User
