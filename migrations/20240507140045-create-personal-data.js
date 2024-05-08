'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Personal_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mail_procoop: {
        type: Sequelize.STRING
      },
      cell_phone: {
        type: Sequelize.STRING
      },
      fixed_phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      id_type_perso_procop: {
        type: Sequelize.INTEGER
      },
      id_situation_procop: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      blood_type: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      factor: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      donor: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Personal_data')
  }
}
