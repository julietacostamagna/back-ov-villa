'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'typePerson', {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: '1: persona fisica, 2: persona legal'
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Users', 'typePerson')
    }
}
