'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Person_legal extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Person_Address, { foreignKey: 'id' })
		}
	}
	Person_legal.init(
		{
			social_raeson: DataTypes.STRING,
			fantasy_name: DataTypes.STRING,
			cuit: DataTypes.INTEGER,
			date_registration: DataTypes.DATE,
			legal_address: DataTypes.STRING,
			num_address: DataTypes.STRING,
			authorization_img: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Person_legal',
		}
	)
	return Person_legal
}

// 'use strict'
// const { DataTypes } = require('sequelize')
// const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

// const Person_legal = sequelizeCoopm_v2.define(
//     'Person_legals',
//     {
//         social_raeson: DataTypes.STRING,
//         fantasy_name: DataTypes.STRING,
//         cuit: DataTypes.INTEGER,
//         date_registration: DataTypes.DATE,
//         legal_address: DataTypes.STRING,
//         num_address: DataTypes.STRING,
//         authorization_img: DataTypes.STRING
//     },
//     {}
// )

// module.exports = Person_legal
