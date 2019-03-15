'use strict'

const Sequelize = require('sequelize')

module.exports = function setupCategory (CategoryModel, ProductCategoryModel) {
  async function findById (req, res) {
    const { params: { id } } = req

    const result = await CategoryModel.findById(id)

    res.status(200).send(result)
  }

  async function findByDepartmentId (req, res) {
    const { params: { department_id } } = req

    const result = await CategoryModel.findAll({
      where: {
        department_id
      }
    })

    res.status(200).send(result)
  }

  async function findByProductId (req, res) {
    const limit = 20
    const { params: { category_id } } = req

    const result = await ProductCategoryModel.findAll({
      attributes: ['category_id'],
      where: {
        category_id
      },
      limit,
      include: [{
        attributes: ['department_id', 'name'],
        model: CategoryModel
      }],
      raw: true
    })

    res.status(200).send(result)
  }

  async function findAll (req, res) {
    const limit = 20
    const rows = await CategoryModel.findAll()
    const [ { count } ] = await CategoryModel.findAll({
      attributes: [[Sequelize.fn('COUNT', '*'), 'count']],
      limit,
      raw: true
    })

    const result = {
      count,
      rows
    }

    res.status(200).send(result)
  }

  return {
    findById,
    findByDepartmentId,
    findByProductId,
    findAll
  }
}
