'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person_physical extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Person_physical.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    type_dni: DataTypes.INTEGER,
    num_dni: DataTypes.INTEGER,
    burn_date: DataTypes.DATE,
    validation_renaper: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Person_physical',
  });
  return Person_physical;
};