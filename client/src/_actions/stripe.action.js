import { sendPayment as sendPaymentService} from '../_services/stripe.service'

export const sendPayment = token => {
    return dispatch => {
        dispatch(request())

        sendPaymentService(token).then(
            resp => dispatch(success(resp)),

            error => dispatch(failure(error))
        )
    }

    function request(){ return {type: "STRIPE_PAYMENT_REQUEST"}}
    function success(resp){ return {type: "STRIPE_PAYMENT_SUCCESS", payload : { resp }  }}
    function failure(error){ return {type: "STRIPE_PAYMENT_FAILURE", payload : error }}
}