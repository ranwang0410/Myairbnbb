import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpotDetail } from '../../store/spotDetails';
import { getReviews, postReview } from "../../store/reviews";
import Reviews from './Reviews';
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import { useModal } from '../../context/Modal';
import './SpotDetails.css';

export default function SpotDetails() {
    const { setModalContent, closeModal } = useModal();
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spotDetails = useSelector(state => state.spotDetails);
    const reviews = useSelector(state => state.reviews[spotId]);
    const sessionUser = useSelector(state => state.session.user);
    const isLoggedIn = Boolean(sessionUser);
    const isOwner = sessionUser && sessionUser.id === spotDetails?.Owner?.id;
    const [hasUserPostedReview, setHasUserPostedReview] = useState(false);

    useEffect(() => {

        dispatch(getSpotDetail(spotId));

        dispatch(getReviews(spotId)).then(() => {
            if (reviews && sessionUser) {
                const userReview = reviews.find(review => review.userId === sessionUser.id);
                setHasUserPostedReview(Boolean(userReview));
            }
        });
    }, [dispatch, spotId]);

    const calculateAverageRating = () => {
        if (reviews && reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.stars, 0);
            return totalRating / reviews.length;
        }
        return 0;
    };

    const calculateNumReviews = () => {
        if (reviews) {
            return reviews.length;
        }
        return 0;
    };

    const averageRating = calculateAverageRating();
    const numReviews = calculateNumReviews();

    const handleNewReview = async (reviewData) => {
        await dispatch(postReview(reviewData));
        setHasUserPostedReview(true)
        closeModal();
        dispatch(getReviews(spotId))
    };

    const openReviewForm = () => {
        setModalContent(
            <ReviewFormModal
                spotId={spotId}
                onReviewSubmit={handleNewReview}
            />
        );
    };

    if (!spotDetails) {
        return null;
    }

    return (
        <>
            <div className='spotDetail-part'>
                <div className="spotDetail-part1">
                    <h2>{spotDetails.name}</h2>
                    <h3>{spotDetails.city}, {spotDetails.state}, {spotDetails.country}</h3>
                </div>
                <div className="image-grid">
                    <div className="large-image">
                        <img src={spotDetails?.SpotImages?.[0]?.url} alt={spotDetails.description} />
                    </div>
                    <div className="small-images">
                        {spotDetails?.SpotImages?.slice(1).map((image) => (
                            <div key={image.id} className="small-image">
                                <img src={image?.url} alt={spotDetails.description} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="spotDetail-part2">
                    <div className="left">
                        <h2>Hosted by {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</h2>
                        <div className="description-detail">{spotDetails.description}</div>
                    </div>

                    <div className="booking">
                        <div className="flex-booking">
                            <div><strong>${spotDetails.price}</strong> night</div>
                            <div className="rating">
                                <span className="fa fa-star checked"></span>
                                {numReviews > 0 ? (
                                    <div>{averageRating.toFixed(1)} · {numReviews} {numReviews === 1 ? "review" : "reviews"}</div>
                                ) : (
                                    <span>New</span>
                                )}
                            </div>
                        </div>
                        <button onClick={() => alert('Feature coming soon')}>Reserve</button>
                    </div>
                </div>
                <div className='line-spot-detail'></div>
                <div className="review">
                    <div className="titlereview">
                        <span className="fa fa-star checked"></span><span>  </span>
                        {numReviews > 0 ? (
                            <font size="5"><strong>{averageRating.toFixed(1)}</strong>  ·  <strong>{numReviews} {numReviews === 1 ? "review" : "reviews"}</strong></font>
                        ) : (
                            <font size="5"><strong>New</strong></font>
                        )}
                    </div>
                    {isLoggedIn && !isOwner && !hasUserPostedReview && (
                        <div className="post-review">
                            <button className='post-review-button' onClick={openReviewForm}>Post Your Review</button>
                        </div>
                    )}
                    <Reviews reviews={reviews} />
                </div>
            </div>
        </>
    );
}
