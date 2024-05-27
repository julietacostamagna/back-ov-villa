'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.User_People, { foreignKey: 'id_user' })
			User.hasMany(models.Service_Request, { foreignKey: 'id_user' })
			this.hasMany(models.Commentary, { as: 'Commentaries', foreignKey: 'id_user' })
		}
	}
	User.init(
		{
			name_register: DataTypes.STRING,
			last_name_register: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: { args: true, msg: 'El email ya existe' },
				validate: { isEmail: true },
			},
			email_verified: DataTypes.DATE,
			password: {
				type: DataTypes.STRING,
				validate: {
					is: {
						args: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
						msg: 'La contraseña no tiene formato correcto',
					},
				},
			},
			token_temp: DataTypes.STRING,
			lvl2_date: DataTypes.DATE,
			lvl3_date: DataTypes.DATE,
			dark: DataTypes.BOOLEAN,
			img_profile: DataTypes.STRING,
			type_person: DataTypes.INTEGER,
			status: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'User',
		}
	)
	return User
}

// 'use strict'
// const { DataTypes } = require('sequelize')
// const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

// const User = sequelizeCoopm_v2.define(
//     'Users',
//     {
//         name_register: DataTypes.STRING,
//         lastName_register: DataTypes.STRING,
//         email: DataTypes.STRING,
//         email_verified: DataTypes.DATE,
//         password: DataTypes.STRING,
//         remember_token: DataTypes.STRING,
//         token_temp: DataTypes.STRING
//     },
//     {}
// )

// module.exports = User
