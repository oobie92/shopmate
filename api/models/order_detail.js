'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupOrderDetailModel (config) {
  const sequelize = setupDatabase(config)
  return sequelize.define('order_detail', {
    item_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    product_attrs: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    product_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    unit_cost: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'order_detail'
  })
}
