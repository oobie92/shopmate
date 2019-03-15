'use strict'

const redis = require('redis')
const client = redis.createClient()

exports.cacheRedis = (req, res, next) => {
  let key = '__express__' + req.originalUrl || req.url
  const timeOut = 60 * 60 * 2

  client.get(key, (err, reply) => {
    if (err) {
      console.log(err)
      next()
    } else {
      if (reply) {
        res.setHeader('content-type', 'application/json');
        res.status(200).send(JSON.parse(reply))
      } else {
        res.sendReponse = res.send
        res.send = body => {
          client.set(key, JSON.stringify(body))
          client.expire(key, timeOut)

          res.sendReponse(body)
        }

        next()
      }
    }
  })
}
