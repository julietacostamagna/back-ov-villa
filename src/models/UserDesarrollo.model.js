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
        id_procoop: { allowNull: true, type: DataTypes.INTEGER },
        name: { allowNull: true, type: DataTypes.STRING },
        last_name: { allowNull: true, type: DataTypes.STRING },
        dni: { allowNull: true, type: DataTypes.INTEGER },
        birthday: { allowNull: true, type: DataTypes.DATE },
        username: { allowNull: true, type: DataTypes.STRING },
        email: { allowNull: true, type: DataTypes.STRING },
        internal_email: { allowNull: true, type: DataTypes.STRING },
        social_mail: { allowNull: true, type: DataTypes.STRING },
        password: { allowNull: true, type: DataTypes.STRING },
        create_time: { allowNull: true, type: DataTypes.DATE },
        admin: { allowNull: true, type: DataTypes.INTEGER },
        area_id: { allowNull: true, type: DataTypes.INTEGER },
        profile_id: { allowNull: true, type: DataTypes.INTEGER },
        internal: { allowNull: true, type: DataTypes.STRING },
        external: { allowNull: true, type: DataTypes.STRING },
        status: { allowNull: true, type: DataTypes.INTEGER },
        phone: { allowNull: true, type: DataTypes.STRING },
        flag: { allowNull: true, type: DataTypes.STRING },
        qr_image: { allowNull: true, type: DataTypes.STRING },
        qr_fields: { allowNull: true, type: DataTypes.STRING },
        home_number: { allowNull: true, type: DataTypes.STRING },
        id_state: { allowNull: true, type: DataTypes.INTEGER },
        id_cities: { allowNull: true, type: DataTypes.INTEGER },
        address: { allowNull: true, type: DataTypes.STRING },
        postal_code: { allowNull: true, type: DataTypes.INTEGER },
        docket: { allowNull: true, type: DataTypes.INTEGER },
        docket_status: { allowNull: true, type: DataTypes.INTEGER },
        cuil: { allowNull: true, type: DataTypes.BIGINT },
        type_document: { allowNull: true, type: DataTypes.STRING },
        status_civil: { allowNull: true, type: DataTypes.INTEGER },
        sex: { allowNull: true, type: DataTypes.INTEGER },
        date_entry: { allowNull: true, type: DataTypes.DATE },
        image: { allowNull: true, type: DataTypes.STRING },
        id_check: { allowNull: true, type: DataTypes.INTEGER },
        user_create: { allowNull: true, type: DataTypes.INTEGER },
        date_create: { allowNull: true, type: DataTypes.DATE },
        user_edit: { allowNull: true, type: DataTypes.INTEGER },
        date_edit: { allowNull: true, type: DataTypes.DATE },
        function_id: DataTypes.INTEGER
    },
    {
        tableName: 'user',
        timestamps: false
    }
)

module.exports = UserDesarrollo
