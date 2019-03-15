'use strict'
const Sequelize = require('sequelize')

module.exports = function setupCategory (AttributesModel, AttributesValueModel, ProductAttributesModel) {
  async function findById (req, res) {
    const { params: { attribute_id } } = req

    const result = await AttributesModel.findByPk(attribute_id)

    if (!result) {
      res.status(404).send({ message: 'No attribute found' })
    } else {
      res.send(result)
    }
  }

  async function findValueById (req, res) {
    const { params: { attribute_id } } = req

    const result = await AttributesValueModel.findAll({
      attributes: ['attribute_value_id', 'value'],
      include: [{
        attributes: [],
        model: AttributesModel,
        where: {
          attribute_id
        }
      }],
      raw: true
    })

    if (!result) {
      res.status(404).send({ message: 'No attribute found' })
    } else {
      res.send(result)
    }
  }

  async function findByProductId (req, res) {
    const { params: { product_id } } = req

    const tmp = await ProductAttributesModel.findAll({
      attributes: ['attribute_value_id', [Sequelize.col('attribute_value.value'), 'attribute_value']],
      where: {
        product_id
      },
      include: [{
        attributes: [],
        model: AttributesValueModel,
        include: [{
          attributes: [[Sequelize.col('name'), 'attribute_name']],
          model: AttributesModel
        }]
      }],
      raw: true
    })

    if (!tmp) {
      res.status(404).send({ message: 'No attribute found' })
    } else {
      const pattern = /attribute_value.attribute./ig
      const result = JSON.parse(JSON.stringify(tmp).replace(pattern, ''))

      result.forEach(obj => {
        delete obj.attribute_id
      })

      res.send(result)
    }
  }

  async function findAll (req, res) {
    const result = await AttributesModel.findAll()

    if (!result) {
      res.status(404).send({ message: 'No attributes found' })
    } else {
      res.send(result)
    }
  }

  return {
    findById,
    findValueById,
    findByProductId,
    findAll
  }
}
