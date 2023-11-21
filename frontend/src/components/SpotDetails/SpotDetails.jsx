import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import {getSpotDetail} from '../../store/spotDetails';

import Navigation from "../Navigation/Navigation";

export default function SpotDetails(){
    const {spotId} = useParams();
    const dispatch = useDispatch();

    const spotDetails = useSelector(state => state.spotDetails);

    useEffect(()=>{
        dispatch(getSpotDetail(spotId))

    })

    return (
        <>
            <div className="Nav">
                <Navigation/>
            </div>

            <div className = 'spotDetail part'>
                <div className="spotDetail part1">
                    <h1>{spotDetails.name}</h1>
                    <h2>{spotDetails.city},{spotDetails.state},{spotDetails.country}</h2>
                </div>

                <div className="spotDetail-spotImage">
                    <img src = {spotDetails.SpotImages.url} alt={spotDetails.description}/>
                </div>

                <div className="spotDetail part2">
                    <p>Hosted by {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</p>
                    <div className="booking">
                       <p>{spotDetails.price} night</p>
                       <button onClick={() => alert('Feature coming soon')}>Reserve</button>
                    </div>
                </div>
            </div>
        </>
    )
}
