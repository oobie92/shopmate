'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupDepartmentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('department', {
    department_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    tableName: 'department'
  })
}
