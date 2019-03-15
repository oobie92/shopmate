'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupProductAttributeModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('product_attribute', {
    product_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    attribute_value_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'product_attribute'
  })
}
