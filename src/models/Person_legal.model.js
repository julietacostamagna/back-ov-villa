const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const User = require('./User.model')

class Person_legal extends Model {}
Person_legal.init(
    {
        social_raeson: { type: DataTypes.STRING },
        fantasy_name: { type: DataTypes.STRING },
        cuit: { type: DataTypes.INTEGER },
        date_registration: { type: DataTypes.DATE },
        legal_address: { type: DataTypes.STRING, allowNull: true },
        num_address: { type: DataTypes.STRING, allowNull: true },
        authorization_img: { type: DataTypes.STRING, allowNull: true }
    },
    {
        sequelize: sequelizeCoopm_v2
    }
)

// RELACIONES FORANEAS
// Falta realizar relacion foranea con tabla de relacion de Personal_data con Person_physical y Person_legal
// Falta realizar relacion con ingresos brutos
// Person_legal.hasMany(User)
module.exports = Person_legal
