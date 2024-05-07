const { DataTypes } = require('sequelize')
const { sequelizeCoopm_v1 } = require('../database/MySQL.database')

const UserDesarrollo = sequelizeCoopm_v1.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        number_customer: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        document_type: {
            type: DataTypes.INTEGER
        },
        document_number: {
            type: DataTypes.STRING
        },
        sex: {
            type: DataTypes.INTEGER
        },
        phone: {
            type: DataTypes.STRING
        },
        id_state: {
            type: DataTypes.INTEGER
        },
        id_cities: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING
        },
        birthday: {
            type: DataTypes.DATE
        },
        date_input: {
            type: DataTypes.DATE
        },
        date_lvl_up_2: {
            type: DataTypes.DATE
        },
        level: {
            type: DataTypes.INTEGER
        },
        email_key: {
            type: DataTypes.INTEGER
        },
        key_validate: {
            type: DataTypes.INTEGER
        },
        key_email_password: {
            type: DataTypes.INTEGER
        },
        img: {
            type: DataTypes.STRING
        },
        popup: {
            type: DataTypes.INTEGER
        },
        dark: {
            type: DataTypes.INTEGER
        },
        date_level_three: {
            type: DataTypes.DATE
        },
        check_lvl_3: {
            type: DataTypes.INTEGER
        },
        check_prepaga: {
            type: DataTypes.INTEGER
        },
        whatsapp: {
            type: DataTypes.STRING
        },
        check_coopate: {
            type: DataTypes.INTEGER
        },
        update_pass: {
            type: DataTypes.INTEGER
        },
        date_update_pass: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'user_customer',
        timestamps: false
    }
)

module.exports = UserDesarrollo
