import React from 'react'
import './Catalog.css'
import CatalogLayout from './CatalogLayout'
import ItemCatalogLayout from '../item/components/ItemCatalogLayout';
import CatalogContent from './CatalogContent';
import PageButton from './PageButton';

const Catalog = (props) => {
    const {items} = props

    return(
        <CatalogContent>
            <h4 className='catalog-props'>{props.total} results, {props.pages} pages</h4>
            {/* {
                props.pages !== 0
                ? for(var i = 0 ; i> 0 ; i--){
                        return(
                            <PageButton/>
                        )
                    }
                    

                
            } */}
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
            <h4 className='catalog-props'>{props.total} results, {props.pages} pages</h4>
            <div className='pages-buttons'>
                    <div onClick={(e) => props.next(e, 1)}>1</div>
                    <div onClick={(e) => props.next(e, 2)}>2</div>
                    <div onClick={(e) => props.next(e, 3)}>3</div>
                    <div onClick={(e) => props.next(e, 4)}>4</div>
                    <div onClick={(e) => props.next(e, 5)}>5</div>
                    <div onClick={(e) => props.next(e, 6)}>6</div>
            </div>
        </CatalogContent>
    )
}

export default Catalog