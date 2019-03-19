import { handleResponse } from '../util/handleResponse'

export const departments = () => {
    const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json'}
    }

    return fetch('https://oobie92.com/api/departments', requestOptions).then(handleResponse)
        

}

export const categoriesByDepartment = id => {
    const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json'}
    }

    return fetch(`https://oobie92.com/api/categories/idDepartment/${id}`, requestOptions).then(handleResponse)
        

}