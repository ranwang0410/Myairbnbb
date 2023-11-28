import { useDispatch, useSelector } from "react-redux";
import {getSpots} from '../../store/allSpots';
import { useEffect } from "react";
import SpotList from "./SpotList";
import './GetAllSpot.css'
export default function GetAllSpot(){
    const dispatch = useDispatch();
    const spots = useSelector(state=>state.getSpots);

    useEffect(()=>{
        dispatch(getSpots())
    },[dispatch])

    return (
        <>
            <div className="spots-list">
                {
                    Object.values(spots).map(spot => (
                        <SpotList key={spot.id} spot={spot}/>
                    ))
                }
            </div>
        </>
    )
}
