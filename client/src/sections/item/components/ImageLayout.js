import React from 'react'
import {PropTypes} from 'prop-types'
import './ImageLayout.css'

const ImageLayout = props => {
    return(
        <div className='image-layout'>
            <img className='principal' src={props.src} />
            <div>
                <img onMouseOver = {(e) => props.focus(e, props.product.image)} className='thumb' src={props.product.image} />
                <img onMouseOver = {(e) => props.focus(e, props.product.image_2)} className='thumb' src={props.product.image_2} />
            </div>
        </div>
    )
}

ImageLayout.propTypes = {
    image: PropTypes.string,
    image_2: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['img'])
  }

export default ImageLayout