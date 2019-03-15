'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupCategoryModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('category', {
    category_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    department_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'category'
  })
}
