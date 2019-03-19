import { handleResponse } from '../util/handleResponse'

export const getAllProducts = (page) => {

    const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json' }
    }

    return fetch(`https://oobie92.com/api/products?page=${page}`, requestOptions).then(handleResponse)
}

export const getAllProductsByDepartment = id => {

    const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json' }
    }

    return fetch(`https://oobie92.com/api/products/idDepartment/${id}`, requestOptions).then(handleResponse)
}

export const getAllProductsByCategory = id => {

    const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json' }
    }

    return fetch(`https://oobie92.com/api/products/idCategory/${id}`, requestOptions).then(handleResponse)
}

export const getProductById = id => {
    const requestOptions = {
        method : 'GET',
        headers : {"Content-Type" : "application/json"}
    }

    return fetch(`https://oobie92.com/api/products/${id}`, requestOptions).then(handleResponse)

}

export const getAttributes = id => {

    const requestOptions = {
        method : 'GET',
        headers : {"Content-Type" : "application/json"}
    }

    return fetch(`https://oobie92.com/api/attributes/idProduct/${id}`, requestOptions).then(handleResponse)

}