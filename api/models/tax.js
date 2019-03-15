'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupTaxModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('tax', {
    tax_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tax_type: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    tax_percentage: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'tax'
  })
}
