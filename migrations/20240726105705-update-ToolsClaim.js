'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Tools_Claims');
    if (tableDescription.id_tool) {
      await queryInterface.removeColumn('Tools_Claims', 'id_tool');
    }
    await queryInterface.addColumn('Tools_Claims', 'id_tool', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Tools',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

	// async down(queryInterface, Sequelize) {
  //   const tableDescription = await queryInterface.describeTable('Tools_Claims');
  //   if (tableDescription.id_tool) {
  //     await queryInterface.removeColumn('Tools_Claims', 'id_tool');
  //   }
  // },
};
