const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const Address = require('./Address.model')
const City = require('./City.model')

class Street extends Model {}
Street.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: { type: DataTypes.STRING },
        id_api: { type: DataTypes.BIGINT },
        id_procoop: { type: DataTypes.BIGINT }
    },
    {
        sequelize: sequelizeCoopm_v2,
        modelName: 'Street'
        // tableName: 'user',
        // timestamps: false
    }
)
Street.hasMany(City)
Street.belongsTo(Address)
module.exports = Street
