import { handleResponse } from '../util/handleResponse'

export const departments = () => {
    const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json'}
    }

    return fetch('https://oobie92.com/api/departments', requestOptions).then(handleResponse)
        

}
