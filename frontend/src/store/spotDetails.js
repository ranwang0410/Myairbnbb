import { csrfFetch } from './csrf';

const GET_SPOTDETAIL = "spotDetails/GET_SPOTDETAIL";


export const getSpotDetail = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const spotDetails = await response.json();
    dispatch({
        type: GET_SPOTDETAIL,
        spotDetails
    });
    return response;
}

export const spotDetailReducer = (state = null, action) => {
    switch (action.type) {
      case GET_SPOTDETAIL:
        return  action.spotDetails

      default:
        return state;
    }
  };
