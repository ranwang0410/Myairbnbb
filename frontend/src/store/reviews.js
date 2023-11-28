import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/GET_REVIEWS';
const POST_REVIEW = 'reviews/POST_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    dispatch({
        type:GET_REVIEWS,
        spotId,
        reviews:data.Reviews
    })
    return response;
}
export const postReview = (reviewData) => async (dispatch)=>{
    const {spotId, stars, review} = reviewData;
    try{
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({review,stars})
    })
    if (response.ok){
    const newReview = await response.json();
    dispatch({
        type:POST_REVIEW,
        review:newReview
    })
    return newReview
    }else{
        const errorData = await response.json();
        return { error: errorData };
    }
}catch(error){
    console.error('Error posting review:', error);
    return { error: error.message };
}
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch({
            type: DELETE_REVIEW,
            reviewId
        });
    }
}
export default function reviewsReducer(state={}, action){
    switch(action.type){
        case GET_REVIEWS:
            return {...state,[action.spotId]: action.reviews }
        case POST_REVIEW:
            return {
                ...state,
                [action.review.spotId]: [action.review, ...(state[action.review.spotId] || [])]
            }
        case DELETE_REVIEW:
            return {
                ...state,
                [action.reviewId]:null
            }
        default:
            return state
    }
}
