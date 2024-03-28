'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_Detail.hasMany(models.Product);
      Order_Detail.hasMany(models.Order);
    }
  };
  Order_Detail.init({
    orderId: DataTypes.STRING,
    productId: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order_Detail',
  });
  return Order_Detail;
};