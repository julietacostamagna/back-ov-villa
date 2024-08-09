'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technicians_Claims extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
			this.belongsTo(models.Claim, { foreignKey: 'id_claim', targetKey: 'id', as: 'claim' })
    }
  }
  Technicians_Claims.init({
    id_claim: DataTypes.INTEGER,
    id_technician: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Technicians_Claims',
  });
  return Technicians_Claims;
};