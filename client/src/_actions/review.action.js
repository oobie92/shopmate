import {
    getReviews as getReviewsService, 
    addReview as addReviewService, 
    deleteReview as deleteReviewService
} from '../_services/reviews.service'

export const getReviews = id => {
    return dispatch => {
        dispatch(request())

        getReviewsService(id).then(
            reviews => dispatch(success(reviews)),

            error => dispatch(failure(error))
        )
    }

    function request(){ return { type : 'GET_REVIEWS_REQUEST'}}
    function success(reviews){ return { type : 'GET_REVIEWS_SUCCESS', reviews}}
    function failure(error){ return { type : 'GET_REVIEWS_FAILURE', error}}
}

export const addReview = review => {
    return dispatch => {
        dispatch(request())

        addReviewService(review).then(
            resp => dispatch(success(resp)),

            error => dispatch(failure(error))
        )
    }

    function request(){ return { type : 'ADD_REVIEW_REQUEST'}}
    function success(msg){ return { type : 'ADD_REVIEW_SUCCESS', msg}}
    function failure(error){ return { type : 'ADD_REVIEW_FAILURE', error}}
}

export const deleteReview = review => {
return dispatch => {
    dispatch(request())
    
    deleteReviewService(review).then(
        resp => dispatch(success(resp)),
        
        error => dispatch(failure(error))
        )
    }
    
    function request(){ return { type : 'REMOVE_REVIEW_REQUEST'}}
    function success(msg){ return { type : 'REMOVE_REVIEW_SUCCESS', msg}}
    function failure(error){ return { type : 'REMOVE_REVIEW_FAILURE', error}}
}
                    
export const changeRating = rating => {
    return {
        type : 'CHANGE_RATING_REQUEST', 
        rating
    }       
}