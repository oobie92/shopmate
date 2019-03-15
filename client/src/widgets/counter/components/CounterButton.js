import React from 'react'
import './CounterButton.css'

const CounterButton = props => {
    return(
        <div className='counter-button' >
            {props.value}
        </div>

    )
} 

export default CounterButton