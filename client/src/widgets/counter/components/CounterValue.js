import React from 'react'
import './CounterValue.css'

const CounterValue = props => {
    return(
        <input className='counter-value' type='text' ref={props.setRef} readonly />
    )
} 

export default CounterValue