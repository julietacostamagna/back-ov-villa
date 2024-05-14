"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pays", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING,
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL(18, 2),
      },
      period: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      voucher: {
        type: Sequelize.STRING,
      },
      type_pay: {
        type: Sequelize.STRING,
      },
      id_entity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      account: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      customer: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name_customer: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_user: {
        allowNull: false,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pays");
  },
};
