import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import { useModal } from '../../context/Modal';
import './Review.css';
import { getReviews } from '../../store/reviews';

export default function Reviews({ reviews }) {
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const handleConfirmDelete = async (reviewId, spotId) => {
    await dispatch(deleteReview(reviewId));
    closeModal();
    await dispatch(getReviews(spotId));

  };

  const openDeleteReviewModal = (review) => {
    setModalContent(
      <DeleteReviewModal
        onConfirm={()=>handleConfirmDelete(review.id,review.spotId)}
        onCancel={closeModal}
      />
    );
  };

  const sortedReviews = reviews?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="reviews-container">
      {sortedReviews && sortedReviews.length > 0 ? (
        sortedReviews.map((review) => {
          let time = review.createdAt;
          let date = new Date(time);
          let options = {
            year: 'numeric',
            month: 'long'
          }
          return (
            <div key={review.id} className="review-item">
              <div className="review-detail">
                <div className='review-name'>{review.User?.firstName ? review.User.firstName : sessionUser.firstName}</div>
                <div className='review-date'>{date.toLocaleDateString(undefined, options)}</div>
                <div className="this-is-review">{review.review}</div>
              </div>
              {sessionUser && review.User?.id === sessionUser.id && (
                <div className="delete-review-button">
                  <button onClick={() => openDeleteReviewModal(review)}>Delete</button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="no-review">Be the first to post a review!</div>
      )}
    </div>
  );
}
