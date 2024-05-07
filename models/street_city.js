'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Street_City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Street_City.init({
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Street_City',
  });
  return Street_City;
};