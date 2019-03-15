'use strict'

const Sequelize = require('sequelize')

module.exports = function setupShoppingCartModel (ShoppingCartModel, ProductModel) {
  async function findById (req, res) {
    const { params: { cart_id } } = req
    const cond = {
      cart_id
    }

    const result = await ShoppingCartModel.findAll(cond)

    if (result.length < 1) {
      res.status(200).send({ message: 'No items' })
    } else {
      res.status(200).send(result)
    }
  }

  async function findCarts (req, res) {
    const { params: { customer_id } } = req

    const cond = {
      where: { customer_id }
    }

    const result = await ShoppingCartModel.findAll(cond)

    console.log(result)

    if (result.length === 0 || result === undefined) {
      res.status(404).send({ message: `No shopping cart for customer: ${customer_id}` })
    } else {
      res.status(200).send(result)
    }
  }

  async function updateItemQtty (req, res) {
    const { params: { item_id } } = req
    const { body } = req

    const cond = {
      where: { item_id }
    }

    const result = await ShoppingCartModel.update(body, cond)

    if (result < 1) {
      res.status(500).send({ message: 'Error while trying to update quantity' })
    } else {
      res.status(200).send(body)
    }
  }

  async function emptyCart (req, res) {
    const { params: { cart_id } } = req

    const cond = {
      where: { cart_id }
    }

    const result = await ShoppingCartModel.destroy(cond)

    if (result < 1) {
      res.status(500).send({ message: 'Error while trying to empty shopping cart' })
    } else {
      res.status(200).send({ message: 'Shopping cart is empty' })
    }
  }

  async function generateId (req, res) {
    const uuidv4 = require('uuid/v4')

    const result = uuidv4()

    res.status(200).send({ 'cart_id': result })
  }

  async function addItem (req, res) {
    const shoppingCart = new ShoppingCartModel()
    const { body } = req

    // Generate random id for the shopping cart
    const uuidv4 = require('uuid/v4')
    const _id = uuidv4()

    shoppingCart.cart_id = body.cart_id || _id
    shoppingCart.product_id = body.product_id
    shoppingCart.product_attrs = body.attributes
    shoppingCart.quantity = 1
    shoppingCart.customer_id = body.customer_id || 0
    shoppingCart.buy_now = 1
    shoppingCart.added_on = new Date()

    await shoppingCart.save(shoppingCart)

    const result = await ShoppingCartModel.findOne({
      where: {
        cart_id: _id
      },
      attributes: [ 'item_id', 'product.name', 'product.price'],
      include: [{
        attributes: [],
        model: ProductModel
      }],
      raw: true
    })

    if (!result) {
      res.status(500).send({ message: 'Something went wrong!' })
    } else {
      result.attributes = body.attributes
      result.subtotal = result.price

      res.status(200).send(result)
    }
  }

  async function totalAmount (req, res) {
    const { params: { cart_id } } = req

    const cond = {
      where: { cart_id }
    }

    const result = await ShoppingCartModel.findAll({
      cond,
      attributes: [ 'item_id', 'product.name', 'product.price'],
      include: [{
        attributes: [],
        model: ProductModel
      }],
      raw: true
    })

    if (!result) {
      res.status(500).send({ message: 'Something went wrong!' })
    } else {
      let total_amount = 0
      result.forEach(cart => {
        total_amount += +cart.price
      })

      console.log(total_amount)

      res.status(200).send({ total_amount })
    }
  }

  async function saveForLater (req, res) {
    const { params: { item_id } } = req

    const cond = {
      where: { item_id }
    }

    const data = {
      buy_now: 0
    }

    const _update = await ShoppingCartModel.update(data, cond)

    if (_update[0] < 1) {
      res.status(404).send({ message: '0 rows updated' })
    } else {
      const result = await ShoppingCartModel.findOne(cond)

      res.status(200).send(result)
    }
  }

  async function moveToCart (req, res) {
    const { params: { item_id } } = req

    const cond = {
      where: { item_id }
    }

    const data = {
      buy_now: 1
    }

    const _update = await ShoppingCartModel.update(data, cond)

    if (_update[0] < 1) {
      res.status(404).send({ message: '0 rows updated' })
    } else {
      const result = await ShoppingCartModel.findOne(cond)

      res.status(200).send(result)
    }
  }

  async function getSaved (req, res) {
    const { params: { cart_id } } = req

    const cond = {
      where: { cart_id,
        buy_now: 0 }
    }

    const result = await ShoppingCartModel.findAll({
      cond,
      attributes: [ 'item_id', 'product.name',
        [Sequelize.col('product_attrs'), 'attributes'], 'product.price'],
      include: [{
        attributes: [],
        model: ProductModel
      }],
      raw: true
    })

    if (!result) {
      res.status(404).send({ message: 'No items saved' })
    } else {
      res.status(200).send(result)
    }
  }

  async function removeProduct (req, res) {
    const { params: { item_id } } = req

    const cond = {
      where: { item_id }
    }

    const result = await ShoppingCartModel.destroy(cond)

    if (result < 1) {
      res.status(404).send({ message: 'Not found' })
    } else {
      res.status(200).send({ message: 'item remove' })
    }
  }

  return {
    generateId,
    addItem,
    findById,
    updateItemQtty,
    emptyCart,
    totalAmount,
    saveForLater,
    moveToCart,
    getSaved,
    removeProduct,
    findCarts
  }
}
