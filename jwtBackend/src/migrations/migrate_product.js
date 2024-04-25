'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.STRING
      },
      objectOfUse: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.BLOB
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      uses: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.STRING
      },
      preserve: {
        type: Sequelize.STRING
      },
      pack: {
        type: Sequelize.STRING
      },
      origin: {
        type: Sequelize.STRING
      },
      productionSite: {
        type: Sequelize.STRING
      },
      listProductId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Product');
  }
};