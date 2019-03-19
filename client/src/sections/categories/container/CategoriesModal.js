import React, {Component} from 'react';
import { createPortal} from 'react-dom';

class CategoriesModal extends Component{
  render(){
    return createPortal(
      this.props.children
      , document.getElementById("categories-container"))
  }
}

export default CategoriesModal