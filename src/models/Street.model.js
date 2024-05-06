const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

class Street extends Model {}
Street.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        name: { type: DataTypes.STRING },
        id_api: { type: DataTypes.BIGINT },
        id_procoop: { type: DataTypes.BIGINT }
    },
    {
        sequelize: sequelizeCoopm_v2
    }
)

module.exports = Street
