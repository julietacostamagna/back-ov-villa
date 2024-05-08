'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name_register: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastName_register: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: { type: Sequelize.STRING, email: true, unique: true },
            email_verified: Sequelize.DATE,
            password: { type: Sequelize.STRING, is: /^(?=.*[A-Z]).{6,}$/ },
            remember_token: { type: Sequelize.STRING, allowNull: true },
            token_temp: { type: Sequelize.STRING, allowNull: true },
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
        await queryInterface.dropTable('Users')
    }
}
