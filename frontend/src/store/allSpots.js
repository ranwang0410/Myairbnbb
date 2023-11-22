import { csrfFetch } from './csrf';

const GET_SPOTS = "spots/GET_SPOTS";
const CREATE_SPOT = 'spots/CREATE_SPOT';

export const getSpots = () => async (dispatch) =>{
    const response = await csrfFetch('/api/spots')
    const data = await response.json();
    const spots = data.Spots;

    dispatch({
        type:GET_SPOTS,
        spots
    });
    return response
}

export const createSpot = (spotData) => async (dispatch) =>{
    const response = await csrfFetch('/api/spots',{
        method:'POST',
        Headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(spotData)
    })
    const newSpot = await response.json();
    dispatch({
        type:CREATE_SPOT,
        spot:newSpot
    })
    dispatch(getSpots());
    return newSpot
}
export const spotReducer = (state = {}, action)=>{
    switch(action.type){
        case GET_SPOTS:
            return action.spots.reduce((spots,spot)=>{
                spots[spot.id]=spot;
                return spots
            },{});
        case CREATE_SPOT:
            return {
                ...state,[action.spot.id]:action.spot
            }
        default:
            return state
    }
}
