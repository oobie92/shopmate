import React from 'react'
import './Header.css'

const Header = props => {
    return(
        <div className='shopping-cart-header'>
            <h2>{props.cart} Items in your cart</h2>
            <h3>
                <span className='first'>Item</span>
                <span className='att'>Size</span>
                <span className='att'>Quantity</span>
                <span className='last'>Price</span>
            </h3>
        </div>
    )
}

export default Header