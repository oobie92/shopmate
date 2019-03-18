import { combineReducers } from 'redux-immutable'
import data from './data.reducer'
import products from './products.reducer'
import shoppingCart from './shopingCart.reducer'
import modal from './modalShoppingCart.reducer'
import reviews from './review.reducer'
import stripe from './stripe.reducer'
import authentication from './authentication.reducer'

const rootReducers = combineReducers({
    authentication,
    data,
    products,
    shoppingCart,
    modal,
    reviews,
    stripe
})

export default rootReducers