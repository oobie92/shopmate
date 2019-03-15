'use strict'

const express = require('express')
const md_auth = require('../middleware/authenticated')
const md_cache = require('../middleware/cache')
const setup = require('../db/setup')
const { OrderController } = setup()

const api = express.Router()

// Parying routes & logic
api.post('/orders/', md_auth.ensureAuth, OrderController.createOrder)
api.get('/orders/idCustomer/', md_auth.ensureAuth, md_cache.cacheRedis, OrderController.orderByCustomer)
api.get('/orders/:order_id', md_auth.ensureAuth, md_cache.cacheRedis, OrderController.findById)
api.get('/orders/shortDetails/:order_id', md_auth.ensureAuth, md_cache.cacheRedis, OrderController.orderDetails)

module.exports = api
