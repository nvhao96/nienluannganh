'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.List_Product);
      Product.hasMany(models.Order_Detail);
    }
  };
  // Object relational mapping
  Product.init({
    name: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    price: DataTypes.INTEGER,
    objectOfUse: DataTypes.STRING,
    img: DataTypes.BLOB,
    quantity: DataTypes.INTEGER,
    uses: DataTypes.STRING,
    preserve: DataTypes.STRING,
    pack: DataTypes.STRING,
    origin: DataTypes.STRING,
    productionSite: DataTypes.STRING,
    listProductId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};