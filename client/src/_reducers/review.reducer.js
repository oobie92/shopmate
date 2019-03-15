import {fromJS} from 'immutable'

const initialState = fromJS({
    reviews : [],
    review : {},
    rating : 0
})

const reviews = (state = initialState, action) => {
    switch(action.type){
        case 'GET_REVIEWS_SUCCESS' :
            return state.set('reviews', action.reviews) 
        case 'ADD_REVIEW_REQUEST' : 
            return state.set('review', action.review)
        case 'CHANGE_RATING_REQUEST' : 
            return state.set('rating', action.rating)
        default :
            return state
    }
}

export default reviews