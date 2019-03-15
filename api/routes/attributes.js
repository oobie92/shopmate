'use strict'

const express = require('express')
const setup = require('../db/setup')
const { AttributesController } = setup()

const api = express.Router()

// Parying routes & logic
api.get('/attributes/', AttributesController.findAll)
api.get('/attributes/:attribute_id', AttributesController.findById)
api.get('/attributes/values/:attribute_id', AttributesController.findById)
api.get('/attributes/idProduct/:product_id', AttributesController.findByProductId)

module.exports = api
