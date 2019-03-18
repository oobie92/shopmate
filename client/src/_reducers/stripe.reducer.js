import { fromJS } from 'immutable'

const initialState = fromJS({
    
})

const stripe = (state=initialState, action) => {
    switch(action.type){
        case 'STRIPE_PAYMENT_SUCCESS' :
            return state.set('confirmation', action.payload.resp)
        default :
            return state
    }
}

export default stripe