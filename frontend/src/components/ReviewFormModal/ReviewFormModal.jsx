import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews'
import StarRating from './StarRating';
// import './LoginForm.css';

export default function ReviewFormModal({ spotId,onReviewSubmit }) {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    useEffect(() => {
        setRating(0);
        setComment('');
        setErrors({});
    },[spotId])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (rating < 1 || rating > 5 || comment.length < 10) {
            setErrors({ message: 'Error message' })
            return;
        }

        try {
            const reviewData = { review:comment,stars:rating, spotId:parseInt(spotId,10) };
            const response = await dispatch(postReview(reviewData));
            console.log("Response from postReview:", response);
            if (response.status >= 200 && response.status < 300) {
                const newReviewData = await response.json();
                onReviewSubmit(newReviewData);
                closeModal()
                setRating(0);
                setComment('');

            }else{
                const data = await response.json();

                setErrors({ message: data.message || 'An unexpected error occurred.' });
            }
        } catch (error) {
            console.error('Error posting review', error);
            setErrors({ message: 'An unexpected error occurred.' });
        }
    }
    return (
        <>
            <h1>How was your stay?</h1>
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
                    <span> Stars</span>
                </div>
                <button className="submit-review-button"
                    type="submit"
                    disabled={comment.length < 10 || rating === 0}
                >Submit Your Review
                </button>
            </form>
        </>
    )
}

