'use strict'

const Sequelize = require('sequelize')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt')

module.exports = function setupCustomer (CustomerModel) {
  async function findById (req, res) {
    const { params: { id } } = req

    const result = await CustomerModel.findByPk(id)

    res.status(200).send(result)
  }

  async function findAll (req, res) {
    // const { params: { product_id } } = req;/

    const result = await CustomerModel.findAll()

    res.status(200).send(result)
  }

  async function saveCustomer (req, res) {
    const customer = new CustomerModel()
    const { body } = req

    customer.name = body.name
    customer.email = body.email
    customer.password = body.password
    customer.credit_card = body.credit_card
    customer.address_1 = body.address_1
    customer.address_2 = body.address_2
    customer.city = body.city
    customer.region = body.region
    customer.postal_code = body.postal_code
    customer.country = body.country
    customer.shipping_region_id = body.shipping_region_id
    customer.day_phone = body.day_phone
    customer.eve_phone = body.eve_phone
    customer.mob_phone = body.mob_phone

    if (body.password) {
      // Encript pass
      bcrypt.hash(body.password, null, null, async (err, hash) => {
        customer.password = hash
        if (customer.name != null && customer.email != null) {
          // Save Users
          // const result = await CustomerModel.create(customer);
          console.log(customer.password.length)
          const result = await customer.save(customer)

          // console.log(result)

          res.status(200).send(customer)
        } else {
          res.status(200).send({ message: 'Complete all the fields' })
        }
      })
    } else {
      res.status(200).send({ message: 'Input your password' })
    }
  }

  async function login (req, res) {
    const { body } = req

    const { email } = body
    const { password } = body

    const cond = {
      email
    }

    const result = await CustomerModel.findOne(cond);

    if (!result) {
      res.status(404).send({ message: 'User not found' })
    } else {
      // Compare pass
      bcrypt.compare(password, result.password, (err, check) => {
        if (check) {
          // Return users info logged in
          if (body.getHash) {
          // Return jwt token
            res.status(200).send({
              token: jwt.createToken(result)
            })
          } else {
            res.status(200).send({ result })
          }
        } else {
          res.status(404).send({ message: "Couldn't logged in" })
        }
      })
    }
  }

  async function updateCustomer (req, res) {
    const { customer } = req
    const { body } = req

    const cond = {
      where: { email: customer.email }
    }

    if (!customer.sub) {
      return res.status(500).send({ message: 'Insufficient privileges' })
    }

    const result = await CustomerModel.update(body, cond)

    if (result < 1) {
      res.status(500).send({ message: 'Error while trying to update user' })
    } else {
      res.status(200).send(body)
    }
  }

  async function updateCreditCard (req, res) {
    const { customer } = req

    const { body } = req

    const cond = {
      where: { email: customer.email,
        customer_id: customer.sub }
    }

    if (!customer.sub) {
      return res.status(500).send({ message: 'Insufficient privileges' })
    }

    const result = await CustomerModel.update(body, cond)

    if (result < 1) {
      res.status(500).send({ message: '0 rows were updated' })
    } else {
      res.status(200).send(body)
    }
  }

  return {
    findAll,
    findById,
    saveCustomer,
    login,
    updateCustomer,
    updateCreditCard
  }
}
