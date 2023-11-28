
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSpotDetail } from '../../store/spotDetails';
import { getReviews, deleteReview } from "../../store/reviews";
import Reviews from './Reviews';
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
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

    const [reviewToDelete, setReviewToDelete] = useState(null);

    const handleDeleteReview = (review) => {
        setReviewToDelete(review);
        openDeleteReviewModal();
    };

    const handleConfirmDelete = () => {
        if (reviewToDelete) {
            dispatch(deleteReview(reviewToDelete.id));
            closeModal();
            setReviewToDelete(null);
        }
    };

    useEffect(() => {
        dispatch(getSpotDetail(spotId));
        dispatch(getReviews(spotId));
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

    const handleNewReview = (newReviewData) => {
        const updatedReviews = [newReviewData, ...reviews];
        dispatch({ type: 'reviews/ADD_REVIEW', spotId, reviews: updatedReviews });
        closeModal()
    };

    const openReviewForm = () => {
        setModalContent(<ReviewFormModal spotId={spotId} onReviewSubmit={handleNewReview} />);
    };

    const openDeleteReviewModal = () => {
        setModalContent(
            <DeleteReviewModal
                review={reviewToDelete}
                onConfirm={handleConfirmDelete}
                onCancel={closeModal}
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
                        <p>{spotDetails.description}</p>
                    </div>

                    <div className="booking">
                        <div className="flex">
                        <p>${spotDetails.price} night</p>
                        <div className="rating">
                        <span className="fa fa-star checked"></span>
                        {numReviews > 0 ? (
                        <p>{averageRating.toFixed(1)} · {spotDetails.numReviews} reviews</p>
                    ) : (
                        <p>New</p>
                    )}
                        </div>
                        </div>
                        <button onClick={() => alert('Feature coming soon')}>Reserve</button>
                    </div>
                </div>

                <div className="review">
                   <div className="titlereview">
                    <span className="fa fa-star checked"></span>
                    {numReviews > 0 ? (
                        <font size="5"><strong>{averageRating.toFixed(2)}</strong> ·

                        <strong>{numReviews} {numReviews === 1 ? "Review" : "Reviews"}</strong></font>
                    ) : (
                        <font size="5"><strong>New</strong></font>
                    )}
                    </div>
                    {isLoggedIn && !isOwner && (
                        <button className ='post-review-button' onClick={openReviewForm}>Post Your Review</button>
                    )}
                    <Reviews reviews={reviews} onDeleteReview={handleDeleteReview} />
                </div>

                {reviewToDelete && (
                    <DeleteReviewModal
                        review={reviewToDelete}
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setReviewToDelete(null)}
                    />
                )}
            </div>
        </>
    )
}


