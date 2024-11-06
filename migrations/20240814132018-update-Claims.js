'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Claims', 'signName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Claims', 'signLastName', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Claims', 'signDni', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Claims', 'signPhone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Claims', 'signImage', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Claims', 'signName');
    await queryInterface.removeColumn('Claims', 'signLastName');
    await queryInterface.removeColumn('Claims', 'signDni');
    await queryInterface.removeColumn('Claims', 'signPhone');
    await queryInterface.removeColumn('Claims', 'signImage');
  }
};
