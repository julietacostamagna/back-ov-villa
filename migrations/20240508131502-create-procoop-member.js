'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Procoop_Members', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			number_customer: {
				type: Sequelize.INTEGER,
			},
			mail_procoop: {
				type: Sequelize.STRING,
			},
			cell_phone: {
				type: Sequelize.STRING,
			},
			fixed_phone: {
				type: Sequelize.STRING,
			},
			id_type_perso_procop: {
				type: Sequelize.INTEGER,
			},
			id_situation_procop: {
				type: Sequelize.INTEGER,
			},
			blood_type: {
				type: Sequelize.STRING,
			},
			factor: {
				type: Sequelize.STRING,
			},
			donor: {
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
		await queryInterface.dropTable('Procoop_Members')
	},
}
