'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User_procoopMember extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Procoop_Member, { as: 'Procoop_Member', foreignKey: 'id_procoop_member' })
		}
	}
	User_procoopMember.init(
		{
			id_user: DataTypes.INTEGER,
			id_procoop_member: DataTypes.INTEGER,
			level: DataTypes.INTEGER,
			primary_account: DataTypes.BOOLEAN,
			status: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'User_procoopMember',
		}
	)
	return User_procoopMember
}

// 'use strict'
// const { DataTypes } = require('sequelize')
// const { sequelizeCoopm_v2 } = require('../database/MySQL.database')

// const User_procoopMember = sequelizeCoopm_v2.define(
//     'User_procoopMembers',
//     {
//         id_user: DataTypes.INTEGER,
//         id_procoop_member: DataTypes.INTEGER,
//         level: DataTypes.INTEGER,
//         primary_account: DataTypes.BOOLEAN,
//         status: DataTypes.BOOLEAN
//     },
//     {}
// )

// module.exports = User_procoopMember
