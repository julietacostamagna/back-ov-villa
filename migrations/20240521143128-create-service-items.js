'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Service_Items', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			service_request_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Service_Requests',
					key: 'id',
				},
			},
			service_form_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			service_type: {
				type: Sequelize.TINYINT,
				allowNull: false,
			},
			status: {
				type: Sequelize.TINYINT,
				allowNull: false,
			},
			cod_sum: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Service_Items')
	},
}
