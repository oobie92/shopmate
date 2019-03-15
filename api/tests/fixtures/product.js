'use strict'

const product = {"product_id":1,"name":"Arc d'Triomphe","description":"This beautiful and iconic T-shirt will no doubt lead you to your own triumph.","price":"14.99","discounted_price":"0.00","image":"https://67936a18.ngrok.io/arc-d-triomphe.gif","image_2":"https://67936a18.ngrok.io/arc-d-triomphe-2.gif","thumbnail":"https://67936a18.ngrok.io/arc-d-triomphe-thumbnail.gif","display":0}

const products = [
  product,
  extend({
    "product_id": 2,
    "name": "Chartres Cathedral",
    "description": "\"The Fur Merchants\". Not all the beautiful stained glass in the great cathedrals depicts saints and angels! Lay aside your furs for the summer and wear this beautiful T-shirt!",
    "price": "16.95",
    "discounted_price": "15.95",
    "image": "https://67936a18.ngrok.io/chartres-cathedral.gif",
    "image_2": "https://67936a18.ngrok.io/chartres-cathedral-2.gif",
    "thumbnail": "https://67936a18.ngrok.io/chartres-cathedral-thumbnail.gif",
    "display": 2
}),
  extend({
    "product_id": 3,
    "name": "Coat of Arms",
    "description": "There's good reason why the ship plays a prominent part on this shield!",
    "price": "14.50",
    "discounted_price": "0.00",
    "image": "https://67936a18.ngrok.io/coat-of-arms.gif",
    "image_2": "https://67936a18.ngrok.io/coat-of-arms-2.gif",
    "thumbnail": "https://67936a18.ngrok.io/coat-of-arms-thumbnail.gif",
    "display": 0
})
]

function extend(obj, values) {
  const clone = Object.assign({}, obj);
  return Object.assign(clone, values);
}

module.exports = {
  single: product,
  all: products,
  findById: products.filter(a => a.id)
}