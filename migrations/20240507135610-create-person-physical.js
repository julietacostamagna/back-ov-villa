'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Person_physicals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            last_name: {
                type: Sequelize.STRING,
            },
            type_dni: {
                type: Sequelize.INTEGER,
            },
            num_dni: {
                type: Sequelize.INTEGER,
            },
            born_date: {
                type: Sequelize.DATE,
            },
            validation_renaper: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            fixed_phone: {
                type: Sequelize.STRING,
            },
            cell_phone: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Person_physicals')
    },
}
