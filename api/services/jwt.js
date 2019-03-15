'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'shopmate'

exports.createToken = (user) => {
  const payload = {
    sub: user.customer_id, // Id from DB
    name: user.name,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  }

  return jwt.encode(payload, secret)
}
