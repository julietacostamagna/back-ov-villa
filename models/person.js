'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Person extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasOne(models.Person_physical, { foreignKey: 'id_person', as: 'Person_physical' })
			this.hasOne(models.Person_legal, { foreignKey: 'id_person', as: 'Person_legal' })
			this.hasMany(models.Person_Address, { foreignKey: 'id_person', as: 'Person_Address' })
			this.hasMany(models.User_People, { foreignKey: 'id_person', as: 'User_People' })
			this.hasMany(models.Service_Request, { foreignKey: 'id_person', as: 'Service_Request' })
		}
	}
	Person.init(
		{
			procoop_last_name: DataTypes.STRING,
			email: DataTypes.STRING,
			number_customer: DataTypes.INTEGER,
			type_person: DataTypes.INTEGER,
			situation_tax: DataTypes.INTEGER,
			fixed_phone: DataTypes.STRING,
			cell_phone: DataTypes.STRING,
			type_document: DataTypes.INTEGER,
			number_document: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'People',
		}
	)
	return Person
}
