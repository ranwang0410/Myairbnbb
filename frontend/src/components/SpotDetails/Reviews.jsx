
import { useSelector } from "react-redux";
import './Review.css'
export default function Reviews({ reviews, onDeleteReview }) {
  const sessionUser = useSelector((state) => state.session.user);
  // console.log(reviews, 'this is the review')
  const sortedReviews = reviews?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  // console.log(sortedReviews, 'sorted reviews')
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
              <div className="review-name">
                {review.User?.firstName ? review.User.firstName : sessionUser.firstName} · {date.toLocaleDateString(undefined, options)}
              </div>
              <div className="this-is-review">{review.review}</div>
              <div>{sessionUser && review.User?.id === sessionUser.id && (
                <div className="delete-review-button"><button onClick={() => onDeleteReview(review)} >Delete</button></div>
              )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-review">Be the first to post a review!</div>
      )}
    </div>
  );
}
