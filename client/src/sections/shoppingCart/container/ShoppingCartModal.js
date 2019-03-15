import React, {Component} from 'react';
import { createPortal} from 'react-dom';

class ShoppingCartModal extends Component{
  render(){
    return createPortal(
      this.props.children
      , document.getElementById("shop-cart-container"))
  }
}

export default ShoppingCartModal;
