import { combineReducers } from 'redux-immutable'
import data from './data.reducer'
import products from './products.reducer'
import shoppingCart from './shopingCart.reducer'
import modal from './modalShoppingCart.reducer'
import reviews from './review.reducer'

const rootReducers = combineReducers({
    data,
    products,
    shoppingCart,
    modal,
    reviews
})

export default rootReducers