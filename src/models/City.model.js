const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const State = require('./State.model')

class City extends Model {}

City.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_procoop: { type: DataTypes.BIGINT },
        COD_LOC: { type: DataTypes.BIGINT },
        DES_LOC: { type: DataTypes.STRING },
        COD_PCI: { type: DataTypes.BIGINT },
        COD_POS: { type: DataTypes.BIGINT }
    },
    {
        sequelize: sequelizeCoopm_v2,
        modelName: 'City'
        // tableName: 'user',
        // timestamps: false
    }
)
City.belongsTo(State, {
    foreignKey: 'COD_PCI',
    targetKey: 'COD_PRO'
})
module.exports = City
