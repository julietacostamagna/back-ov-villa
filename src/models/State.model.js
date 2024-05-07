const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

class State extends Model {}
State.init(
    {
        id_procoop: { type: DataTypes.BIGINT },
        COD_PRO: { type: DataTypes.BIGINT, unique: true },
        DES_PRO: { type: DataTypes.STRING },
        COD_AFIP: { type: DataTypes.BIGINT }
    },
    {
        sequelize: sequelizeCoopm_v2
    }
)

module.exports = State
