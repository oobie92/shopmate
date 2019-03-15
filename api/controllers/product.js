'use strict'

const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { DOMAIN } = require('../config');

module.exports = function setupProduct (ProductModel, ProductCategoryModel,
  CategoryModel, DepartmentModel,
  ReviewModel, CustomerModel) {

  async function findById (req, res) {
    const { params: { id } } = req

    const result = await ProductModel.findByPk(id)

    if (result) {
      console.log(result)
      result.image = `${DOMAIN}/${result.image}`
      result.image_2 = `${DOMAIN}/${result.image_2}`
      result.thumbnail = `${DOMAIN}/${result.thumbnail}`

      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'Not Found' })
    }
  }

  async function findByIdDetails (req, res) {
    const { params: { product_id } } = req

    const result = await ProductModel.findAll({
      attributes: ['product_id', 'name', 'description', 'price',
        'discounted_price', 'image', 'image_2'],
      where: {
        product_id
      }
    })

    if (result.length > 0) {
      result[0].image = `${DOMAIN}/${result[0].image}`
      result[0].image_2 = `${DOMAIN}/${result[0].image_2}`

      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'Not Found' })
    }
  }

  async function findByDepartment (req, res) {
    const { params: { product_id } } = req

    const tmp = await ProductCategoryModel.findAll({
      attributes: ['category.category_id', [Sequelize.col('category.name'), 'category_name']
      ],
      include: [{
        attributes: [],
        model: ProductModel,
        where: {
          product_id
        }
      },
      {
        attributes: [],
        model: CategoryModel,
        include: [{
          attributes: [
            [Sequelize.col('name'), 'department_name']
          ],
          model: DepartmentModel
        }]
      }],
      raw: true
    })

    if (!tmp) {
      res.status(404).send({ message: 'No attribute found' })
    } else {
      const pattern = /category.department./ig
      const result = JSON.parse(JSON.stringify(tmp).replace(pattern, ''))

      res.status(200).send(result)
    }
  }

  async function findAll (req, res) {

    const page = req.query.page || 1;
    let offset;

    const limit = 20;
    if(page <= 1) {
      offset = 0;
    } else {
      offset = (limit * page) - limit;
    }

    const rows = await ProductModel.findAll({
      attributes: ['product_id', 'name', 'description', 'price',
        'discounted_price', 'thumbnail'],
      limit,
      offset,
      raw: true
    })
    const [ { count } ] = await ProductModel.findAll({
      attributes: [[Sequelize.fn('COUNT', '*'), 'count']],
      limit,
      raw: true
    })

    if (rows.length > 0) {
      rows.forEach(row => {
        row.thumbnail = `${DOMAIN}/${row.thumbnail}`
      })

      const result = {
        count,
        rows
      }

      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'Not Found' })
    }
  }

  async function search (req, res) {

    const page = req.query.page || 1;
    const string = req.query.query_string;
    let offset;

    console.log(string);

    const limit = 20;
    if(page <= 1) {
      offset = 0;
    } else {
      offset = (limit * page) - limit;
    }

    const cond = {
      where: {
        [Op.or]: [{
          description: {
            [Op.like]: `%${string}%`
          },
          name: {
            [Op.like]: `%${string}%`
          }
        }
        ]
      }
    }

    const rows = await ProductModel.findAll({
      attributes: ['product_id', 'name', 'description', 'price',
        'discounted_price', 'thumbnail'],
        where: {
          [Op.or]: [{
            description: {
              [Op.like]: `%${string}%`
            },
            name: {
              [Op.like]: `%${string}%`
            }
          }
          ]
        },
      limit,
      offset,
      raw: true
    })
    const [ { count } ] = await ProductModel.findAll({
      attributes: [[Sequelize.fn('COUNT', '*'), 'count']],
      limit,
      cond,
      raw: true
    });

    // console.log(rows)

    if (rows.length > 0) {
      rows.forEach(row => {
        row.thumbnail = `${DOMAIN}/${row.thumbnail}`
      })

      const result = {
        count,
        rows
      }

      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'Not Found' })
    }
  }

  async function findByCategoryId (req, res) {
    const { params: { category_id } } = req

    const limit = 20
    const [ { count } ] = await ProductCategoryModel.findAll({
      attributes: [[Sequelize.fn('COUNT', '*'), 'count']],
      where: {
        category_id
      },
      limit,
      include: [{
        attributes: [],
        model: ProductModel
      }],
      raw: true
    })
    const rows = await ProductCategoryModel.findAll({
      attributes: ['product.product_id', 'product.name', 'product.description', 'product.price',
        'product.discounted_price', 'product.thumbnail'],
      where: {
        category_id
      },
      limit,
      include: [{
        attributes: [],
        model: ProductModel
      }],
      raw: true
    })

    if (rows.length > 0) {
      rows.forEach(row => {
        row.thumbnail = `${DOMAIN}/${row.thumbnail}`
      })

      const result = {
        count,
        rows
      }

      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'Not Found' })
    }
  }

  async function findByReview (req, res) {
    const { params: { product_id } } = req

    const limit = 20
    const result = await ReviewModel.findAll({
      attributes: ['customer.name', 'review', 'rating', 'created_on'],
      limit,
      include: [{
        attributes: [],
        model: ProductModel,
        where: {
          product_id
        } },
      {
        attributes: [],
        model: CustomerModel
      }
      ],
      raw: true
    })

    if (result.length > 0) {
      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'This product has not reviews' })
    }
  }

  async function createReview (req, res) {
    const { params: { product_id } } = req
    const { customer: { sub } } = req
    const review = new ReviewModel()
    const { body } = req

    review.customer_id = sub
    review.product_id = product_id
    review.review = body.review
    review.rating = body.rating
    review.created_on = new Date()

    await review.save(review)

    res.status(200).send(review)
  }

  async function findByDepartmentId (req, res) {
    const { params: { department_id } } = req

    const limit = 20
    const [ { count } ] = await ProductCategoryModel.findAll({
      attributes: [[Sequelize.fn('COUNT', '*'), 'count']],
      limit,
      include: [{
        attributes: [],
        model: ProductModel
      },
      {
        attributes: [],
        model: CategoryModel,
        where: {
          department_id
        }
      }],
      raw: true
    })
    const rows = await ProductCategoryModel.findAll({
      attributes: ['product.product_id', 'product.name', 'product.description', 'product.price',
        'product.discounted_price', 'product.thumbnail'],
      include: [{
        attributes: [],
        model: ProductModel
      },
      {
        attributes: [],
        model: CategoryModel,
        where: {
          department_id
        }
      }],
      raw: true
    })

    if (rows.length > 0) {
      rows.forEach(row => {
        row.thumbnail = `${DOMAIN}/${row.thumbnail}`
      })

      const result = {
        count,
        rows
      }

      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'Not Found' })
    }
  }

  return {
    findAll,
    search,
    findById,
    findByCategoryId,
    findByDepartmentId,
    findByDepartment,
    findByIdDetails,
    findByReview,
    createReview
  }
}
