import React from 'react'
import './Footer.css'
import Button from '../../../widgets/button/Button';

const Footer = props => {
    return(
        <div className='footer-shopping-cart'>
            <div className='back'>
                <Button 
                    clickHandle={props.closeShoppingCart} 
                    size='medium'
                    type='button'
                    name='Back to shop'
                    color={'#F62F5E'}
                    background={'#FFFFFF'} />
            </div>
            <div className='checkout'>
                <Button
                    clickHandle={props.closeShoppingCart} 
                    size='medium'
                    type='button'
                    name='checkout'
                    color={'#ffffff'}
                    background={'#f62f5e'} />
            </div>
        </div>
    )
}

export default Footer