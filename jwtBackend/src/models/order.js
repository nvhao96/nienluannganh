'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User);

    }
  };
  Order.init({
    userId: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    totalCost: DataTypes.STRING,
    pay: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};