'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Person_physicals', 'SexId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'TypeSexes',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
        await queryInterface.addColumn('Users', 'img_profile', {
            type: Sequelize.STRING,
            allowNull: true
        })
        await queryInterface.addColumn('Users', 'dark', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Person_physicals', 'SexId')
        await queryInterface.removeColumn('Users', 'img_profile')
        await queryInterface.removeColumn('Users', 'dark')
    }
}
