const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

class Address_user extends Model {}
Address_user.init(
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        number_address: { type: DataTypes.STRING },
        floor: { type: DataTypes.STRING },
        dpto: { type: DataTypes.INTEGER },
        postal_code: { type: DataTypes.DATE },
        google_address: { type: DataTypes.STRING, allowNull: true },
        owner_name: { type: DataTypes.STRING, allowNull: true },
        owner_last_name: { type: DataTypes.STRING, allowNull: true },
        owner_num_dni: { type: DataTypes.STRING, allowNull: true }
    },
    {
        sequelize: sequelizeCoopm_v2
    }
)

// RELACIONES FORANEAS
// Falta hacer relacion con datos catastrales.

module.exports = Address_user
