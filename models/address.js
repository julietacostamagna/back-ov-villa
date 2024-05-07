'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Address.init(
        {
            number_address: DataTypes.STRING,
            floor: DataTypes.STRING,
            dpto: DataTypes.INTEGER,
            postal_code: DataTypes.DATE,
            owner_name: DataTypes.STRING,
            owner_last_name: DataTypes.STRING,
            owner_num_dni: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Address'
        }
    )
    return Address
}
