import { combineReducers } from 'redux-immutable'
import data from './data.reducer'
import products from './products.reducer'
import shoppingCart from './shopingCart.reducer'
import modal from './modalShoppingCart.reducer'
import modalCategories from './modalCategories.reducer'
import reviews from './review.reducer'
import stripe from './stripe.reducer'

const rootReducers = combineReducers({
    data,
    products,
    shoppingCart,
    modal,
    modalCategories,
    reviews,
    stripe
})

export default rootReducers