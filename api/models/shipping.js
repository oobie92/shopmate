'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupShippingModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('shipping', {
    shipping_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shipping_type: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    shipping_cost: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    shipping_region_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'shipping'
  })
}
