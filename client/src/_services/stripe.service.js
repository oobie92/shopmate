import { authHeader } from "../util/authHeader";
import { handleResponse } from "../util/handleResponse";

export const sendPayment = token => {
    // console.log(token.id)
    const requestOptions = {
        method : 'POST',
        headers : {...authHeader(), "Content-Type": "text/plain"},
        // headers : {"Content-Type": "text/plain"},
        // body : { stripeEmail : "admin@admin.com" , token}
        body : token.id
    }

    return fetch(`https://oobie92.com/api/stripe/charge/`, requestOptions).then(handleResponse)
}