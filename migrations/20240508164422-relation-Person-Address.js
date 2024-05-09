'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Person_Addresses', 'Procoop_MembersId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Procoop_Members',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
        await queryInterface.addColumn('Person_Addresses', 'UserId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
        await queryInterface.addColumn('Person_Addresses', 'AddressId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Addresses',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Person_Addresses', 'AddressId')
        await queryInterface.removeColumn('Person_Addresses', 'Procoop_MembersId')
    }
}
