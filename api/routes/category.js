'use strict'

const express = require('express')
const setup = require('../db/setup')
const md_cache = require('../middleware/cache')
const { CategoryController } = setup()

const api = express.Router()

// Parying routes & logic
api.get('/categories/', md_cache.cacheRedis, CategoryController.findAll)
api.get('/categories/:id', md_cache.cacheRedis, CategoryController.findById)
api.get('/categories/idDepartment/:department_id', md_cache.cacheRedis, CategoryController.findByDepartmentId)
api.get('/categories/idProduct/:category_id', md_cache.cacheRedis, CategoryController.findByProductId)

module.exports = api
