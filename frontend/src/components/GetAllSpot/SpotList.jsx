import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './GetAllSpot.css'
export default function SpotList({spot}){
    const [navigateTo, setNavigateTo] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        if(navigateTo){
            navigate(navigateTo)
        }
    },[navigateTo,navigate])

    const handleClick = () =>{
        setNavigateTo(`/spots/${spot.id}`)
    }

    const newRating=()=>{
        if(spot.avgRating){
            return <div>{spot.avgRating}</div>
        }
        return <div>New</div>
    }
    return (
        <div className="landing-spot-list" onClick={handleClick} title={spot.name}>
            <img src={spot.previewImage ? spot.previewImage : null} alt={spot.name}/>
            <div className="description">
                <div className="flex">
                    <div className="bold">{spot.city}, {spot.state}</div>
                    <div className="rating">
                        <img src='https://img.ixintu.com/download/jpg/20200809/9db320ac045b6806eea07a883b5a1672_512_512.jpg!con' alt='star'/>
                        {newRating()}
                    </div>

                </div>

                <div className="bold">${spot.price} night</div>
            </div>
        </div>
    )
}
