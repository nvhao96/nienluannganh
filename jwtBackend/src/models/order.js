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
      Order.hasMany(models.Order_Detail);

    }
  };
  // Object relational mapping
  Order.init({
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    totalCost: DataTypes.INTEGER,
    pay: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};