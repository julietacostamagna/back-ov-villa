'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tools_Claims extends Model {
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
  Tools_Claims.init({
    id_tool: DataTypes.INTEGER,
    id_claim: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tools_Claims',
  });
  return Tools_Claims;
};