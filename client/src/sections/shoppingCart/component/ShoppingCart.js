import React from 'react';
import Header from '../../shoppingCart/component/Header'
import ShoppingCartMain from '../container/ShoppingCartMain'
import Footer from '../../shoppingCart/component/Footer'
import './ShoppingCart.css'

function ShoppingCart(props) {
  // console.log(props)
  return(
    <div className="Modal">
      {props.children}
      <button onClick={(e) => props.closeShoppingCart(e)} className="Modal-close" />
      <Header {...props} />
      <ShoppingCartMain {...props} />
      <Footer {...props} />
    </div>
  )
}

export default ShoppingCart