'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class State extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    State.init(
        {
            COD_PRO: DataTypes.BIGINT,
            DES_PRO: DataTypes.BIGINT,
            COD_AFIP: DataTypes.BIGINT
        },
        {
            sequelize,
            modelName: 'State'
        }
    )
    return State
}
