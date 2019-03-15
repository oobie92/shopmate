'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupOrdersModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('orders', {
    order_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    total_amount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false
    },
    shipped_on: {
      type: Sequelize.DATE,
      allowNull: true
    },
    status: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    comments: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    customer_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    auth_code: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    reference: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    shipping_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    },
    tax_id: {
      type: Sequelize.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'orders'
  })
}
