'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class City extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			City.belongsToMany(models.Street, {
				through: 'Street_City',
				as: 'Streets',
				foreignKey: 'CityId',
			})
			City.hasMany(models.Address, {
				foreignKey: 'CityId',
				sourceKey: 'COD_LOC',
			})
			// define association here
		}
	}
	City.init(
		{
			COD_LOC: DataTypes.BIGINT,
			DES_LOC: DataTypes.STRING,
			COD_POS: DataTypes.BIGINT,
			COD_PCI: DataTypes.BIGINT,
		},
		{
			sequelize,
			modelName: 'City',
		}
	)
	return City
}
