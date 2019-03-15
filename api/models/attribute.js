'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupAttributeModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('attribute', {
    attribute_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'attribute'
  })
}
