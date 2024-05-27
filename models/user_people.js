'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User_People extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Person, { foreignKey: 'id_person', as: 'People' })
			this.belongsTo(models.User, { foreignKey: 'id_user', as: 'Users' })
		}
	}
	User_People.init(
		{
			id_user: DataTypes.INTEGER,
			id_person: DataTypes.INTEGER,
			level: DataTypes.INTEGER,
			primary_account: DataTypes.BOOLEAN,
			status: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'User_People',
		}
	)
	return User_People
}
