'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupShoppingCartModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('shopping_cart', {
    item_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cart_id: {
      type: Sequelize.CHAR(100),
      allowNull: false
    },
    product_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    product_attrs: {
      type: Sequelize.CHAR(255),
      allowNull: false
    },
    customer_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    buy_now: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    added_on: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    tableName: 'shopping_cart'
  })
}
