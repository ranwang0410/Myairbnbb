import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/GET_REVIEWS';

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

export default function reviewsReducer(state={}, action){
    switch(action.type){
        case GET_REVIEWS:
            return {...state,[action.spotId]: action.reviews }
        default:
            return state
    }
}
