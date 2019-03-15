'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupCustomerModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('customer', {
    customer_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    credit_card: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    address_1: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    address_2: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    city: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    region: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    postal_code: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    country: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    shipping_region_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    day_phone: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    eve_phone: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    mob_phone: {
      type: Sequelize.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'customer'
  })
}
