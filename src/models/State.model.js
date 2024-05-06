const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

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
        sequelize: sequelizeCoopm_v2,
        modelName: 'State'
        // tableName: 'user',
        // timestamps: false
    }
)
State.hasMany(City, {
    foreignKey: 'COD_PCI',
    sourceKey: 'COD_PRO'
})
module.exports = State
