'use strict'

const express = require('express')
const md_auth = require('../middleware/authenticated')
const setup = require('../db/setup')
const { StripeController } = setup()

const api = express.Router()

// Parying routes & logic
// api.get('/stripe/success/', md_auth.ensureAuth, StripeController.success);
// api.get('/stripe/cancel/', md_auth.ensureAuth, StripeController.cancel);
api.post('/stripe/charge/', StripeController.payment)

module.exports = api
