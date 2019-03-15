'use strict'

const debug = require('debug')('shopmate:api:db')
const Sequelize = require('sequelize')
const defaults = require('defaults')
const { DB_NAME, DB_USER, DB_PASS } = require('../config')

const settings = {
  db: {
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    host: '',
    dialect: 'mysql',
    port: '3306',
    logging: s => debug(s)
  },
  session: {
    operatorsAliases: Sequelize.Op,
    define: {
      timestamps: false
    },
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  }
}

const config = defaults(settings.db, settings.session)

module.exports = config
