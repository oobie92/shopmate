import React from 'react'
import './ItemCatalogLayout.css'
import {getRandomColor} from '../../../util/randomColor'
// import Test from '../../../assets/alsace-2.gif'

const ItemCatalogLayout = (props) => {
    return(
        <div className='item-catalog-layout'>
            <div className='item-cat-layout'>
                <div onClick={(e) => props.itemClickHandle(e, props.item.product_id)} className='item'>
                    <img src={props.item.thumbnail} alt={props.item.thumbnail} />
                    <h3>{props.item.name}</h3>            
                    <h2>{props.item.price}</h2>
                </div>            
            </div>
        </div>
    )
}

export default ItemCatalogLayout