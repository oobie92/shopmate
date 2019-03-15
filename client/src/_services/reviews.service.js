import { handleResponse } from "../util/handleResponse";


export const getReviews = (id) => {

    const requestOptions = {
        method : 'GET',
        headers : {"Content-Type": "application/json"}
    }

    return fetch(`https://oobie92.com/api/products/${id}/reviews`, requestOptions).then(handleResponse)
}


export const addReview = (item) => {

    const requestOptions = {
        method : 'POST',
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(item)
    }

    return fetch('https://oobie92.com/api/products/${id}/reviews', requestOptions).then(handleResponse)
}

export const deleteReview = (item) => {

    const requestOptions = {
        method : 'GET',
        headers : {"Content-Type": "application/json"}
    }

    return fetch('url/reviews', requestOptions).then(handleResponse)
}