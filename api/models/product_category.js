'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupProductCategoryModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('product_category', {
    product_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'product_category'
  })
}
