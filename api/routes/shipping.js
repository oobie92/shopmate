'use strict'

const express = require('express')
const setup = require('../db/setup')
const md_cache = require('../middleware/cache')
const { ShippingController } = setup()

const api = express.Router()

// Parying routes & logic
api.get('/shipping/regions', md_cache.cacheRedis, ShippingController.findAll)
api.get('/shipping/regions/:shipping_region_id', md_cache.cacheRedis, ShippingController.findById)

module.exports = api
