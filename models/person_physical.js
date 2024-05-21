'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Person_physical extends Model {
		static associate(models) {
			this.belongsTo(models.TypeSex, { foreignKey: 'SexId' })
		}
	}
	Person_physical.init(
		{
			name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			type_dni: DataTypes.INTEGER,
			num_dni: DataTypes.INTEGER,
			born_date: DataTypes.DATE,
			validation_renaper: DataTypes.INTEGER,
			fixed_phone: DataTypes.STRING,
			cell_phone: DataTypes.STRING,
			EmployeeId: DataTypes.INTEGER,
			SexId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Person_physical',
		}
	)
	return Person_physical
}
