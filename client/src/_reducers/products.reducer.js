import {fromJS} from 'immutable'
import { productSchema } from '../schemas/products.schema'
import { getSchema } from '../util/normalize'

const initialState = fromJS({
    isFetching : false,
    entities : {},
    products : {},
    total : 0,
    pages : 0,
    currentPage : 1
})

const products = (state = initialState, action) => {
    switch(action.type){
        case 'PRODUCTS_REQUEST' :
            return state.set('isFetching', true)
        case 'PRODUCTS_SUCCESS' :
            const {entities} = getSchema(action.products, productSchema)
            return state.set('isFetching', false)
                        .set('entities', entities)
                        .set('products', entities.product)
                        .set('total', action.products.count)
                        .set('pages', Math.ceil(action.products.count/action.products.rows.length))
                        .set('currentPage', action.page)        
        case 'ATTRIBUTES_SUCCESS' :
            return state.set('attributes', action.attributes)      
        case 'PRODUCT_BY_ID_REQUEST' :
            return state.set('isFetching', true)
            case 'PRODUCT_BY_ID_SUCCESS' :
            return state.set('item', action.product)
            .set('src', action.product.image)
            .set('isFetching', false)
        case 'PRODUCT_BY_ID_CHANGE_SRC' :
            return state.set('src', action.src)
        default :
            return state
    }
}

export default products