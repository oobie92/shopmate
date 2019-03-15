'use strict'

const { SECRET_KEY } = require('../config')
const stripe = require('stripe')(SECRET_KEY)

module.exports = function setupStripe () {
  async function payment (req, res) {
    const { body } = req

    // Stripe params
    const { stripeEmail } = body
    const { stripeToken } = body

    // Form data
    // const { amount } = body;
    // const { description } = body;

    // Change when production
    const amount = '1100'
    const description = 'Testing'

    stripe.customers.create({
      email: stripeEmail,
      source: stripeToken
    })
      .then(customer => stripe.charges.create({
        amount,
        description,
        currency: 'usd',
        customer: customer.id
      }))
      .then(charge => {
      // console.log(charge);
        res.send('success')
      })
  }

  async function success (req, res) {

  }

  async function cancel (req, res) {
    res.send({ message: 'Canceled' })
  }

  return {
    success,
    cancel,
    payment
  }
}
