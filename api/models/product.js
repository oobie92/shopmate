'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupProductModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('product', {
    product_id: {
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
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    discounted_price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    image: {
      type: Sequelize.STRING(150),
      allowNull: true
    },
    image_2: {
      type: Sequelize.STRING(150),
      allowNull: true
    },
    thumbnail: {
      type: Sequelize.STRING(150),
      allowNull: true
    },
    display: {
      type: Sequelize.INTEGER(6),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'product'
  })
}
