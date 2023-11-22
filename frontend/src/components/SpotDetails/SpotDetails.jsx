import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpotDetail } from '../../store/spotDetails';
import { getReviews } from "../../store/reviews";
import Reviews from './Reviews';
// import Navigation from "../Navigation/Navigation";
import './SpotDetails.css'
export default function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spotDetails = useSelector(state => state.spotDetails);
    const reviews = useSelector(state => state.reviews[spotId]);
    useEffect(() => {
        dispatch(getSpotDetail(spotId))
        dispatch(getReviews(spotId))

    }, [dispatch, spotId])

    if (!spotDetails) {
        return null;
    }
    return (
        <>

            <div className='spotDetail-part'>
                <div className="spotDetail-part1">
                    <h1>{spotDetails.name}</h1>
                    <h2>{spotDetails.city},{spotDetails.state},{spotDetails.country}</h2>
                </div>
                <div className="image">
                    {spotDetails.SpotImages?.map(image => (
                        <img key={image.id} src={image.url} alt={spotDetails.description} />
                    ))}
                </div>

                <div className="spotDetail-part2">
                    <div className="left">
                        <h3>Hosted by {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</h3>
                        <p>{spotDetails.description}</p>
                    </div>

                    <div className="booking">

                        <p>${spotDetails.price} night</p>

                        <div className="rating">
                            <img src='https://img.ixintu.com/download/jpg/20200809/9db320ac045b6806eea07a883b5a1672_512_512.jpg!con' alt='star' />
                            {/* <p>{spotDetails.avgRating} · {spotDetails.numReviews} reviews</p> */}
                            {spotDetails.numReviews > 0 ? (
                                <p>{spotDetails.avgRating} · {spotDetails.numReviews} reviews</p>
                            ) : (
                                <p>New</p>
                            )}
                        </div>
                        <button onClick={() => alert('Feature coming soon')}>Reserve</button>
                    </div>
                </div>

                <div className="review">
                    <img src='https://img.ixintu.com/download/jpg/20200809/9db320ac045b6806eea07a883b5a1672_512_512.jpg!con' alt='star' />
                    {spotDetails.numReviews > 0 ? (
                        <p>{spotDetails.avgRating} · {spotDetails.numReviews} reviews</p>
                    ) : (
                        <p>New</p>
                    )}
                    <button>Post Your Review</button>
                    <Reviews reviews={reviews} />
                </div>
            </div>
        </>
    )
}
