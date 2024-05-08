'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Cities', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_procoop: {
                type: Sequelize.BIGINT
            },
            COD_LOC: {
                type: Sequelize.BIGINT
            },
            DES_LOC: {
                type: Sequelize.STRING
            },
            COD_PCI: {
                type: Sequelize.BIGINT
            },
            COD_POS: {
                type: Sequelize.BIGINT
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
        await queryInterface.dropTable('Cities')
    }
}
