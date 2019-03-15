'use strict'

const Sequelize = require('sequelize')
const config = require('./config')

let sequelize = null

module.exports = function setupDatabase () {
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }

  return sequelize
}
