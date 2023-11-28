import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './GetAllSpot.css'
export default function SpotList({ spot }) {
    const [navigateTo, setNavigateTo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (navigateTo) {
            navigate(navigateTo)
        }
    }, [navigateTo, navigate])

    const handleClick = () => {
        setNavigateTo(`/spots/${spot.id}`)
    }

    const newRating = () => {
        if (spot.avgRating) {
            return <div>{spot.avgRating}</div>
        }
        return <div>New</div>
    }
    return (
        <div className="landing-spot-list" onClick={handleClick} title={spot.name}>
            <img src={spot.previewImage ? spot.previewImage : null} alt={spot.name} />
            <div className="description">
                <div className="flex">
                    <span className="city-state">{spot.city}, {spot.state}</span>
                    <span className="rating">
                        <span className="fa fa-star checked"></span>
                        {newRating()}
                    </span>

                </div>

                <div>
                    <span className="bold">$</span><span className="bold">{spot.price}</span> night
                </div>
            </div>
        </div>
    )
}
