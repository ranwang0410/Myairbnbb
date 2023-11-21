import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/GET_REVIEWS';

export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json();
    const reviews = data.Reviews;
    dispatch({
        type:GET_REVIEWS,
        reviews
    })
    return response;
}
