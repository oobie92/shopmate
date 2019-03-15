'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupAuditModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('audit', {
    audit_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    code: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'audit'
  })
}
