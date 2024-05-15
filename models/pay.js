"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pay.init(
    {
      status: DataTypes.INTEGER,
      message: DataTypes.STRING,
      total: DataTypes.DECIMAL,
      period: DataTypes.STRING,
      voucher: DataTypes.STRING,
      type_pay: DataTypes.STRING,
      id_entity: DataTypes.STRING,
      account: DataTypes.INTEGER,
      customer: DataTypes.INTEGER,
      name_customer: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pay",
    }
  );
  return Pay;
};
