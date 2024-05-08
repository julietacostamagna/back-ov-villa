'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Personal_data.init({
    mail_procoop: DataTypes.STRING,
    cell_phone: DataTypes.STRING,
    fixed_phone: DataTypes.STRING,
    id_type_perso_procop: DataTypes.INTEGER,
    id_situation_procop: DataTypes.INTEGER,
    blood_type: DataTypes.INTEGER,
    factor: DataTypes.INTEGER,
    donor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Personal_data',
  });
  return Personal_data;
};