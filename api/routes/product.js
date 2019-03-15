'use strict'

const express = require('express')
const md_auth = require('../middleware/authenticated')
const md_cache = require('../middleware/cache')
const setup = require('../db/setup')
const { ProductController } = setup()

const api = express.Router()

// Parying routes & logic
api.get('/products/', md_cache.cacheRedis, ProductController.findAll)
api.get('/products/search', ProductController.search)
api.get('/products/:id', md_cache.cacheRedis, ProductController.findById)
api.get('/products/idCategory/:category_id', ProductController.findByCategoryId)
api.get('/products/idDepartment/:department_id', ProductController.findByDepartmentId)
api.get('/products/:product_id/details', md_cache.cacheRedis, ProductController.findByIdDetails)
api.get('/products/:product_id/locations', md_cache.cacheRedis, ProductController.findByDepartment)
api.get('/products/:product_id/reviews', ProductController.findByReview)
api.post('/products/:product_id/reviews', md_auth.ensureAuth, ProductController.createReview)

module.exports = api
