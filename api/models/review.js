'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../db/db')

module.exports = function setupReviewModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('review', {
    review_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    review: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    rating: {
      type: Sequelize.INTEGER(6),
      allowNull: false
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    tableName: 'review'
  })
}
