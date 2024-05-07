const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const State = require('./State.model')
const Address = require('./Address.model')

class City extends Model {}

City.init(
    {
        id_procoop: { type: DataTypes.BIGINT },
        COD_LOC: { type: DataTypes.BIGINT },
        DES_LOC: { type: DataTypes.STRING },
        COD_PCI: { type: DataTypes.BIGINT },
        COD_POS: { type: DataTypes.BIGINT }
    },
    {
        sequelize: sequelizeCoopm_v2
    }
)

module.exports = City
