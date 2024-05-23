'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Address extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.City, { foreignKey: 'CityId', targetKey: 'id' })
			this.belongsTo(models.State, { foreignKey: 'StateId', targetKey: 'id' })
			this.belongsTo(models.Street, { foreignKey: 'StreetId' })
			this.hasMany(models.Person_Address, { foreignKey: 'AddressId', as: 'Person_Addresses' })
		}
	}
	Address.init(
		{
			number_address: DataTypes.STRING,
			floor: DataTypes.STRING,
			dpto: DataTypes.INTEGER,
			postal_code: DataTypes.DATE,
			owner_name: DataTypes.STRING,
			owner_last_name: DataTypes.STRING,
			owner_num_dni: DataTypes.STRING,
			StreetId: DataTypes.INTEGER,
			CityId: DataTypes.INTEGER,
			StateId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Address',
		}
	)
	return Address
}
