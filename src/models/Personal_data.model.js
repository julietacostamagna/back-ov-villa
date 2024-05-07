const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

class Personal_data extends Model {}
Personal_data.init(
    {
        mail_procoop: { type: DataTypes.STRING, email: true },
        cell_phone: { type: DataTypes.STRING },
        fixed_phone: { type: DataTypes.STRING, allowNull: true },
        id_type_perso_procop: { type: DataTypes.INTEGER },
        id_situation_procop: { type: DataTypes.INTEGER, allowNull: true },
        grupo_sanguineo: { type: DataTypes.INTEGER, allowNull: true },
        factor: { type: DataTypes.INTEGER, allowNull: true },
        donante: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
        sequelize: sequelizeCoopm_v2
    }
)
// RELACIONES FORANEAS
// Falta realizar relacion foranea con tabla de relacion de Personal_data con Person_physical y Person_legal
// Falta relacion con situacion impositiva

module.exports = Personal_data
