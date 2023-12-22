import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews'
import StarRating from './StarRating';
import './ReviewFormModal.css'

export default function ReviewFormModal({ spotId, onReviewSubmit }) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    useEffect(() => {
        setRating(0);
        setComment('');
        setErrors({});
    }, [spotId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
        const reviewData = { review: comment, stars: rating, spotId: parseInt(spotId, 10) };
        const response = await dispatch(postReview(reviewData));
        // console.log(response, 'response')
        if (response.status >= 200 && response.status < 300) {
            const newReviewData = await response.json();
            onReviewSubmit(newReviewData);
            closeModal()
            setRating(0);
            setComment('');
        } else if(response.status === 500) {
            const errorResponse = await response.json();
            // console.log(errorResponse.message, 'message')
            throw new Error({message:errorResponse.message || 'User already has a review for this spot'});
        }}catch(error){
            // console.log(error,'=>error')
            setErrors({ message: 'User already has a review for this spot'});
        }

    }
    return (
        <div className='reviews-form'>
            <div className='review-title'>How was your stay?</div>
            {errors.message && <p className="error-message">{errors.message}</p>}
            <form onSubmit={handleSubmit} className="review-form">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave your review here..."
                    required
                />
                <div className="star-rating">
                    <StarRating setRating={setRating} />
                    <div className='stars'> Stars</div>
                </div>
                <button className="submit-review-button"
                    type="submit"
                    disabled={comment.length < 10 || rating === 0}
                >Submit Your Review
                </button>
            </form>
        </div>
    )
}

