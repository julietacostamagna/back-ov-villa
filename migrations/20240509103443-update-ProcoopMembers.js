'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Procoop_Members', 'name', {
            type: Sequelize.STRING
        })
        await queryInterface.addColumn('Procoop_Members', 'last_name', {
            type: Sequelize.STRING,
            allowNull: true
        })
        await queryInterface.addColumn('Procoop_Members', 'type_dni', {
            type: Sequelize.INTEGER
        })
        await queryInterface.addColumn('Procoop_Members', 'num_dni', {
            type: Sequelize.BIGINT
        })
        await queryInterface.addColumn('Procoop_Members', 'burn_date', {
            type: Sequelize.DATE,
            allowNull: true
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Procoop_Members', 'name')
        await queryInterface.removeColumn('Procoop_Members', 'last_name')
        await queryInterface.removeColumn('Procoop_Members', 'type_dni')
        await queryInterface.removeColumn('Procoop_Members', 'num_dni')
        await queryInterface.removeColumn('Procoop_Members', 'burn_date')
    }
}
