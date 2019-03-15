'use strict'

const express = require('express')
const md_auth = require('../middleware/authenticated')
const setup = require('../db/setup')
const { CustomerController } = setup()

const api = express.Router()

// Parying routes & logic
api.get('/customers/:id', md_auth.ensureAuth, CustomerController.findById)
api.post('/customers/', CustomerController.saveCustomer)
api.post('/customers/login', CustomerController.login)
api.put('/customers/adress/', md_auth.ensureAuth, CustomerController.updateCustomer)
api.put('/customers/creditCard/', md_auth.ensureAuth, CustomerController.updateCreditCard)
// api.get('/customers/', CustomerController.findAll);

module.exports = api
