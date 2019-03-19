import React from 'react';
import {NavLink} from 'react-router-dom'
import './Categories.css'

function Categories(props) {
  return(
    <div className="modal-container">
      {
        props.categories !== undefined
        ? props.categories.map(category => (
          <NavLink to={`/products/inCategory/${category.category_id}`}>
            {category.name}
          </NavLink>
          ))
        : ''
      }
    </div>
  )
}

export default Categories