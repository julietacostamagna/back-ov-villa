const { DataTypes, Model } = require('sequelize')
const { sequelizeOfivirv2 } = require('../database/MySQL.database')
const City = require('./City.model')

class State extends Model {}
State.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_procoop: { type: DataTypes.BIGINT },
        COD_PRO: { type: DataTypes.BIGINT },
        DES_PRO: { type: DataTypes.STRING },
        COD_AFIP: { type: DataTypes.BIGINT }
    },
    {
        sequelize: sequelizeOfivirv2,
        modelName: 'State'
        // tableName: 'user',
        // timestamps: false
    }
)
State.hasMany(City, {
    foreignKey: 'COD_PCI',
    sourceKey: 'id'
})
module.exports = State
