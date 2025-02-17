'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaysMethodEnableds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaysMethodEnableds.init({
    id_method: DataTypes.INTEGER,
    api_key: DataTypes.STRING,
    access_token: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    name_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaysMethodEnableds',
  });
  return PaysMethodEnableds;
};