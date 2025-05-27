'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('claims', 'signName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('claims', 'signLastName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('claims', 'signDni', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('claims', 'signPhone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('claims', 'signImage', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('claims', 'signName');
    await queryInterface.removeColumn('claims', 'signLastName');
    await queryInterface.removeColumn('claims', 'signDni');
    await queryInterface.removeColumn('claims', 'signPhone');
    await queryInterface.removeColumn('claims', 'signImage');
  }
};
