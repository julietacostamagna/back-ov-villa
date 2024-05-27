'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Address extends Model {
		static associate(models) {
			this.belongsTo(models.City, { foreignKey: 'id_city', targetKey: 'id' })
			this.belongsTo(models.State, { foreignKey: 'id_state', targetKey: 'id' })
			this.belongsTo(models.Street, { foreignKey: 'id_street' })
			this.hasMany(models.Person_Address, { foreignKey: 'id_address', as: 'Person_Addresses' })
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
			id_street: DataTypes.INTEGER,
			id_city: DataTypes.INTEGER,
			id_state: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Address',
		}
	)
	return Address
}
