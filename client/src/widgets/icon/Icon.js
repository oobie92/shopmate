import React from 'react'
import './Icon.css'

const Icon = (props) => <span onClick={ (e) => props.openShoppingCart(e)} className={props.iconName} />

export default Icon