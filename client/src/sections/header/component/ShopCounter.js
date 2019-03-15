import React from 'react'
import './ShopCounter.css'

const ShopCounter = props => {
    return(
        <h1 className='shop-counter'>{props.cart}</h1>
    )
}

export default ShopCounter