'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('User_detail', {
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
            id_person_physical: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Person_physicals', // nombre de la tabla relacionada
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            id_person_legal: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Person_legals', // nombre de la tabla relacionada
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
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
        await queryInterface.addColumn('Cities', 'COD_PCI', {
            type: Sequelize.BIGINT,
            references: {
                model: 'States',
                key: 'COD_PRO'
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
        await queryInterface.removeColumn('Cities', 'COD_PCI')

        // Elimina la clave foránea de la tabla 'User'
        await queryInterface.removeColumn('Users', 'Personal_dataId')
    }
}
