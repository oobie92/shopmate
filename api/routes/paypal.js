'use strict'

const express = require('express')
const md_auth = require('../middleware/authenticated')
const setup = require('../db/setup')
const { PaypalController } = setup()

const api = express.Router()

// Parying routes & logic
api.get('/paypal/success/', md_auth.ensureAuth, PaypalController.success)
api.get('/paypal/cancel/', md_auth.ensureAuth, PaypalController.cancel)
api.post('/paypal/pay/', md_auth.ensureAuth, PaypalController.payment)

module.exports = api
