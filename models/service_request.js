'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Service_Request extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.procoop_member, { foreignKey: 'procoop_member_id', as: 'Procoop_Members' })
			this.belongsTo(models.user, { foreignKey: 'user_id', as: 'User' })
			this.hasMany(models.service_items, { foreignKey: 'service_request_id', as: 'Service_Items' })
		}
	}
	Service_Request.init(
		{
			procoop_member_id: DataTypes.INTEGER,
			user_id: { type: DataTypes.INTEGER, allowNull: false },
			status: { type: DataTypes.TINYINT, allowNull: false },
		},
		{
			sequelize,
			modelName: 'Service_Request',
		}
	)
	return Service_Request
}
