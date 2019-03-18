import React from 'react'
import Counter from '../../../widgets/counter/container/Counter'
import Button from '../../../widgets/button/Button';
import Size from '../../../widgets/size/container/Size';
import './DescriptionLayout.css'
import Color from '../../../widgets/color/container/Color';

const DescriptionLayout = (props) => {
    const {product} = props
    product.quantity = 0
    return(
        <div className='description-layout'>
            <h1 className='title'>{`${product.name} - ${product.description}`}</h1>
            <h1 className={`price-${props.discountStyle}`}>{product.price}</h1>
            <h3 className={`discount-${props.discountStyle}`}>{product.discounted_price}</h3>
            <span className='att'>color</span>
            <Color {...props} />
            <span className='att'>size</span>
            <Size {...props} />
            <span className='att'>Quantity</span>
            <Counter />
            <Button
                clickHandle={props.addToCart}
                target={product}
                size='medium'
                name='Add to cart'
                type='button'
                color={'#ffffff'}
                background={'#f62f5e'}
            />
            {/* <WishList /> */}
        </div>
    )
}

export default DescriptionLayout