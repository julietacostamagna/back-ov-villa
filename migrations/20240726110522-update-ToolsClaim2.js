'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
      const tableDescription = await queryInterface.describeTable('Tools_Claims');
      if (tableDescription.id_tool) {
        await queryInterface.removeColumn('Tools_Claims', 'id_tool');
      }
    },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
