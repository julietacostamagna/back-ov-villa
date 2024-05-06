const { DataTypes, Model } = require('sequelize')
const { sequelizeCoopm_v2 } = require('../database/MySQL.database')
const User = require('./User.model')
const Address = require('./Address.model')

class Personal_data extends Model {}
Personal_data.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        mail_procoop: { type: DataTypes.STRING, email: true },
        cell_phone: { type: DataTypes.STRING },
        fixed_phone: { type: DataTypes.STRING, isNull: true },
        id_type_perso_procop: { type: DataTypes.INTEGER },
        id_situation_procop: { type: DataTypes.INTEGER, isNull: true },
        grupo_sanguineo: { type: DataTypes.INTEGER, isNull: true },
        factor: { type: DataTypes.INTEGER, isNull: true },
        donante: { type: DataTypes.INTEGER, isNull: true }
    },
    {
        sequelize: sequelizeCoopm_v2,
        modelName: 'Personal_data'
    }
)
// RELACIONES FORANEAS
// Falta realizar relacion foranea con tabla de relacion de Personal_data con Person_physical y Person_legal
// Falta relacion con situacion impositiva
Personal_data.hasMany(User)
Personal_data.hasMany(Address)
module.exports = Personal_data
