'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Procoop_Member extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Procoop_Member.hasMany(models.service_request, { foreignKey: 'procoop_member_id', as: 'Service_Requests' })
		}
	}
	Procoop_Member.init(
		{
			mail_procoop: DataTypes.STRING,
			cell_phone: DataTypes.STRING,
			fixed_phone: DataTypes.STRING,
			id_type_perso_procop: DataTypes.INTEGER,
			id_situation_procop: DataTypes.INTEGER,
			blood_type: DataTypes.INTEGER,
			factor: DataTypes.INTEGER,
			donor: DataTypes.INTEGER,
			name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			type_dni: DataTypes.INTEGER,
			num_dni: DataTypes.BIGINT,
			born_date: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Procoop_Member',
		}
	)
	return Procoop_Member
}

// 'use strict'
// const { DataTypes } = require('sequelize')
// const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

// const Procoop_Member = sequelizeCoopm_v2.define(
//     'Procoop_Members',
//     {
//         mail_procoop: DataTypes.STRING,
//         cell_phone: DataTypes.STRING,
//         fixed_phone: DataTypes.STRING,
//         id_type_perso_procop: DataTypes.INTEGER,
//         id_situation_procop: DataTypes.INTEGER,
//         blood_type: DataTypes.INTEGER,
//         factor: DataTypes.INTEGER,
//         donor: DataTypes.INTEGER,
//         name: DataTypes.STRING,
//         last_name: DataTypes.STRING,
//         type_dni: DataTypes.INTEGER,
//         num_dni: DataTypes.BIGINT,
//         born_date: DataTypes.DATE
//     },
//     {}
// )

// module.exports = Procoop_Member
