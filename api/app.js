'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Loading routes
const departmentsRoutes = require('./routes/department')
const categoriesRoutes = require('./routes/category')
const productsRoutes = require('./routes/product')
const shippingRoutes = require('./routes/shipping')
const taxesRoutes = require('./routes/taxes')
const customerRoutes = require('./routes/customer')
const shoppingCartRoutes = require('./routes/shopping_cart')
const orderRoutes = require('./routes/order')
const attributesRoutes = require('./routes/attributes')
const paypalRoutes = require('./routes/paypal')
const stripeRoutes = require('./routes/stripe')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // Converts HTTPs petitions to JSON

// Allowing to serve static files
app.use(express.static('./assets/images'))

app.get('/', (req, res, next) => {
  res.send('Shopmate')
})

// Headers configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')

  next()
})

// Base Routes
app.use('/api/', departmentsRoutes)
app.use('/api/', categoriesRoutes)
app.use('/api/', productsRoutes)
app.use('/api/', shippingRoutes)
app.use('/api/', taxesRoutes)
app.use('/api/', customerRoutes)
app.use('/api/', shoppingCartRoutes)
app.use('/api/', orderRoutes)
app.use('/api/', attributesRoutes)
app.use('/api/', paypalRoutes)
app.use('/api/', stripeRoutes)

module.exports = app
