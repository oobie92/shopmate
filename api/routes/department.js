'use strict'

const express = require('express')
const setup = require('../db/setup')
const md_cache = require('../middleware/cache')
const { DepartmentController } = setup()

const api = express.Router()

// Parying routes & logic
api.get('/departments/:id', md_cache.cacheRedis, DepartmentController.findById)
api.get('/departments/', md_cache.cacheRedis, DepartmentController.findAll)

module.exports = api
