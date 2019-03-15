'use strict'

const paypal = require('paypal-rest-sdk')
const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = require('../config')

module.exports = function setupPaypal () {
  // Load sandbox
  paypal.configure({
    'mode': 'sandbox', // sandbox or live
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET
  })

  async function success (req, res) {
    console.log(req)
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId

    const execute_payment_json = {
      'payer_id': payerId,
      'transactions': [{
        'amount': {
          'currency': 'USD',
          'total': '125.00'
        }
      }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) {
        console.log(error.response)
        throw error
      } else {
        console.log(JSON.stringify(payment))
        res.send('Success')
      }
    })
  }

  async function payment (req, res) {
    console.log(req)
    const create_payment_json = {
      'intent': 'sale',
      'payer': {
        'payment_method': 'paypal'
      },
      'redirect_urls': {
        'return_url': `${DOMAIN}/paypal/success`,
        'cancel_url': `${DOMAIN}/paypal/cancel`
      },
      'transactions': [{
        'item_list': {
          'items': [{
            'name': 'Classic Guitar',
            'sku': '987-123',
            'price': '125.00',
            'currency': 'USD',
            'quantity': 1
          }]
        },
        'amount': {
          'currency': 'USD',
          'total': '125.00'
        },
        'description': 'Amazing sound'
      }]
    }

    paypal.payment.create(create_payment_json, (err, payment) => {
      if (err) {
        throw err
      } else {
        // for(let i = 0;i < payment.links.length;i++){
        for (let i in payment.links) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href)
          }
        }
      }
    })
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
