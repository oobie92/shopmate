'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupAttributeValueModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('attribute_value', {
    attribute_value_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    attribute_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    value: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'attribute_value'
  })
}
