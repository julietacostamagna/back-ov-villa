'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// await queryInterface.removeColumn('Person_Addresses', 'UserId')
		await queryInterface.addColumn('Person_Addresses', 'PersonPhysicalId', {
			type: Sequelize.INTEGER,
			references: {
				model: 'Person_physicals',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		})
		await queryInterface.addColumn('Person_Addresses', 'PersonLegalsId', {
			type: Sequelize.INTEGER,
			references: {
				model: 'Person_legals',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('Person_Addresses', 'UserId', {
			type: Sequelize.INTEGER,
			references: {
				model: 'User',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		})
		await queryInterface.removeColumn('Person_Addresses', 'PersonPhysicalId')
		await queryInterface.removeColumn('Person_Addresses', 'PersonLegalsId')
	},
}
