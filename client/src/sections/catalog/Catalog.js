import React from 'react'
import CatalogLayout from './CatalogLayout'
import ItemCatalogLayout from '../item/components/ItemCatalogLayout';

const Catalog = (props) => {
    const {items} = props

    return(
            <CatalogLayout>
                {
                    Object.keys(items).length!==0 ?
                    Object.keys(items).map((k) => {
                        if(items[k] !== undefined){
                            return(
                                <ItemCatalogLayout 
                                    key={items[k].product_id} 
                                    item={items[k]} 
                                    itemClickHandle={props.itemClickHandle}
                                    addToCart={props.addToCart} />
                            )
                        }
                    }) : ('')
                }            
            </CatalogLayout> 

    )
}

export default Catalog