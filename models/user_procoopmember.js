'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User_procoopMember extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User_procoopMember.init(
        {
            level: DataTypes.INTEGER,
            primary_account: DataTypes.BOOLEAN,
            status: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'User_procoopMember'
        }
    )
    return User_procoopMember
}
