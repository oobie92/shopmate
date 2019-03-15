import { getAllProducts, getProductById, getAttributes as getAttributesService } from '../_services/products.service'

export const getAll = (page = 1) => {

    return dispatch => {
        dispatch(request())

        getAllProducts(page)
            .then(
                products => dispatch(success(products)),

                error => dispatch(failure(error))
            )
    }

    function request(){ return {type: 'PRODUCTS_REQUEST'}}
    function success(products) { return { type: 'PRODUCTS_SUCCESS', products, page}}
    function failure(error) { return { type: 'PRODUCTS_FAILURE', error}}

}

export const getById = id => {

    return dispatch => {
        dispatch(request())

        getProductById(id)
            .then(
                product => dispatch(success(product)),

                error => dispatch(failure(error))
            )

    }

    function request(){ return {type: 'PRODUCT_BY_ID_REQUEST'}}
    function success(product) { return { type: 'PRODUCT_BY_ID_SUCCESS', product}}
    function failure(error) { return { type: 'PRODUCT_BY_ID_FAILURE', error}}

}

export const changeSrc = src => {
    return {
        type : 'PRODUCT_BY_ID_CHANGE_SRC',
        src
    }
}

export const getAttributes = id => {

    return dispatch => {
        dispatch(request())

        getAttributesService(id)
            .then(
                attributes => dispatch(success(attributes)),

                error => dispatch(failure(error))
            )

    }

    function request(){ return {type: 'ATTRIBUTES_REQUEST'}}
    function success(attributes) { return { type: 'ATTRIBUTES_SUCCESS', attributes}}
    function failure(error) { return { type: 'ATTRIBUTES_FAILURE', error}}

}
