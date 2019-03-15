'use strict'

const express = require('express')
const md_auth = require('../middleware/authenticated')
const setup = require('../db/setup')
const { ShoppingCartController } = setup()

const api = express.Router()

// Parying routes & logic
api.get('/shoppingcart/generateUniqueId', ShoppingCartController.generateId)
api.get('/shoppingcart/customerCart/:customer_id', ShoppingCartController.findCarts)
api.get('/shoppingcart/:cart_id', ShoppingCartController.findById)
api.post('/shoppingcart/add', ShoppingCartController.addItem)
api.put('/shoppingcart/update/:item_id', ShoppingCartController.updateItemQtty)
api.delete('/shoppingcart/empty/:cart_id', ShoppingCartController.emptyCart)
api.get('/shoppingcart/totalAmount/:cart_id', ShoppingCartController.totalAmount)
api.put('/shoppingcart/moveToCart/:item_id', ShoppingCartController.moveToCart)
api.put('/shoppingcart/saveForLater/:item_id', ShoppingCartController.saveForLater)
api.get('/shoppingcart/getSaved/:cart_id', ShoppingCartController.getSaved)
api.delete('/shoppingcart/removeProduct/:item_id', ShoppingCartController.removeProduct)

module.exports = api
