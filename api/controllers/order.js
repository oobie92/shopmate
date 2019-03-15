'use strict'

const Sequelize = require('sequelize')

module.exports = function setupShoppingCartModel (OrderDetailModel, OrderModel, CustomerModel) {
  async function findById (req, res) {
    const { params: { order_id } } = req
    const cond = {
      order_id
    }

    const result = await OrderDetailModel.findAll({
      // cond,
      limit: 1,
      attributes: ['order.order_id', 'product_id',
        [Sequelize.col('product_attrs'), 'attributes'], 'product_name',
        'quantity', 'unit_cost'],
      include: [{
        attributes: [],
        model: OrderModel,
        cond
      }]
    })

    console.log(result)

    if (result.length < 1) {
      res.status(200).send({ message: 'No orders' })
    } else {
      result.subtotal = result.unit_cost
      res.status(200).send(result)
    }
  }

  async function orderByCustomer (req, res) {
    const { customer: { sub } } = req

    const result = await OrderModel.findAll({
      attributes: ['order_id', 'total_amount', 'created_on', 'shipped_on', 'status', 'customer.name'],
      include: [{
        attributes: [],
        model: CustomerModel,
        where: {
          customer_id: sub
        }
      }],
      raw: true
    })

    if (result.length < 1) {
      res.status(404).send({ message: 'No orders found' })
    } else {
      res.send(result)
    }
  }

  async function orderDetails (req, res) {
    const { params: { order_id } } = req

    const result = await OrderModel.findOne({
      where: {
        order_id
      },
      attributes: ['order_id', 'total_amount', 'created_on',
        'shipped_on', 'status', 'customer.name'],
      include: [{
        attributes: [],
        model: CustomerModel
      }],
      raw: true
    })

    if (result.length < 1) {
      res.status(404).send({ message: 'No orders found' })
    } else {
      res.send(result)
    }
  }

  async function createOrder (req, res) {
    const order = new OrderModel()
    const { body } = req

    order.cart_id = body.cart_id
    order.customer_id = body.customer_id
    order.shipping_id = body.shipping_id
    order.tax_id = body.tax_id
    order.total_amount = '0.00'
    order.shipped_on = null
    order.status = 0
    order.comments = ''
    order.auth_code = ''
    order.created_on = new Date()

    const result = await order.save(order)

    const [ orderId ] = await OrderModel.findAll({
      attributes: ['order_id'],
      where: {
        customer_id: body.customer_id,
        shipping_id: body.shipping_id,
        tax_id: body.tax_id
      },
      limit: 1,
      order: [ [ 'order_id', 'DESC' ]]
    })

    console.log(orderId.order_id)

    res.status(200).send({ order_id: orderId.order_id })
  }

  return {
    createOrder,
    findById,
    orderByCustomer,
    orderDetails
  }
}
