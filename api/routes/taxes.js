'use strict'

const express = require('express')
const setup = require('../db/setup')
const md_cache = require('../middleware/cache')
const { TaxesController } = setup()

const api = express.Router()

// Parying routes & logic
api.get('/tax', md_cache.cacheRedis, TaxesController.findAll)
api.get('/tax/:tax_id', md_cache.cacheRedis, TaxesController.findById)

module.exports = api
