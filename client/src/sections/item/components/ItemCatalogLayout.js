import React from 'react'
import './ItemCatalogLayout.css'
// import Test from '../../../assets/alsace-2.gif'

const ItemCatalogLayout = (props) => {
    return(
        <div className='item-catalog-layout'>
            <div className='item-cat-layout'>
                <div onClick={(e) => props.itemClickHandle(e, props.item.product_id)} className='item'>
                    <img src={props.item.thumbnail} />
                    <h3>{props.item.name}</h3>            
                    <h2>{props.item.price}</h2>
                </div>            
                {/* <button onClick={(e) => props.addToCart(e, props.item)} >Add to cart</button> */}
            </div>
            <div className='hidden'>
                <h3>HOLA QUE HACE</h3>            
            </div>            
        </div>
    )
}

export default ItemCatalogLayout