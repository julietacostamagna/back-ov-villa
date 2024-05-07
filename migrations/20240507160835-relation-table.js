'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        // Agrega las claves foráneas a la tabla 'Address'
        await queryInterface.addColumn('Addresses', 'StreetId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Streets', // nombre de la tabla relacionada
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })
        await queryInterface.addColumn('Addresses', 'CityId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Cities',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })
        await queryInterface.addColumn('Addresses', 'StateId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'States',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })

        // Agrega la clave foránea a la tabla 'City'
        await queryInterface.addColumn('Cities', 'StateId', {
            type: Sequelize.BIGINT,
            references: {
                model: 'States',
                key: 'COD_PRO'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })

        // Agrega la clave foránea a la tabla 'User'
        await queryInterface.addColumn('Users', 'Personal_dataId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Personal_data',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })
    },

    async down(queryInterface, Sequelize) {
        // Elimina las claves foráneas de la tabla 'Address'
        await queryInterface.removeColumn('Addresses', 'StreetId')
        await queryInterface.removeColumn('Addresses', 'CityId')
        await queryInterface.removeColumn('Addresses', 'StateId')

        // Elimina la clave foránea de la tabla 'City'
        await queryInterface.removeColumn('Cities', 'StateId')

        // Elimina la clave foránea de la tabla 'User'
        await queryInterface.removeColumn('Users', 'Personal_dataId')
    }
}
