'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupShippingRegionModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('shipping_region', {
    shipping_region_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shipping_region: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'shipping_region'
  })
}
