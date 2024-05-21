'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Service_Items extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Service_Request, {
				foreignKey: 'service_request_id',
				as: 'Service_Requests',
			})
		}
	}

	Service_Items.init(
		{
			service_request_id: { type: DataTypes.INTEGER, allowNull: false },
			service_form_id: { type: DataTypes.INTEGER, allowNull: false },
			service_type: { type: DataTypes.TINYINT, allowNull: false },
			status: { type: DataTypes.TINYINT, allowNull: false },
			cod_sum: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Service_Items',
		}
	)
	return Service_Items
}
