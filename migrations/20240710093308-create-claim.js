'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('claims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.INTEGER
      },
      service: {
        type: Sequelize.INTEGER
      },
      nro_customer: {
        type: Sequelize.INTEGER
      },
      customer: {
        type: Sequelize.STRING
      },
      technician: {
        type: Sequelize.INTEGER
      },
      observations: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('claims');
  }
};