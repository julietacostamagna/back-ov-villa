const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {
    static associate(models) {}
  }
  Claim.init({
    description: DataTypes.STRING,
    type: DataTypes.INTEGER,
    service: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    nro_customer: DataTypes.INTEGER,
    customer: DataTypes.STRING,
    technician: DataTypes.INTEGER,
    observations: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Claim',
    tableName: 'Claims'
  });

  return Claim;
};
