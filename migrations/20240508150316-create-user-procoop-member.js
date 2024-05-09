'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('User_procoopMembers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_user: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users', // nombre de la tabla relacionada
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            id_procoop_member: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Procoop_Members', // nombre de la tabla relacionada
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            level: {
                type: Sequelize.INTEGER
            },
            primary_account: {
                type: Sequelize.BOOLEAN
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
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('User_procoopMembers')
    }
}
