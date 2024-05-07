'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    City.init(
        {
            id_procoop: DataTypes.BIGINT,
            COD_LOC: DataTypes.BIGINT,
            DES_LOC: DataTypes.STRING,
            COD_PCI: DataTypes.BIGINT,
            COD_POS: DataTypes.BIGINT
        },
        {
            sequelize,
            modelName: 'City'
        }
    )
    return City
}
