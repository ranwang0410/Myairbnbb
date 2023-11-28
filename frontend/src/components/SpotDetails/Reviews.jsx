
import { useSelector } from "react-redux";

export default function Reviews({ reviews, onDeleteReview }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => {
          const isCurrentUserReview =
            sessionUser && review.User?.id === sessionUser.id;

          return (
            <div key={review.id} className="review-item">
              <p>
                {review.User?.firstName || "Anonymous"} · {review.createdAt}
              </p>
              <p>{review.review}</p>
              {isCurrentUserReview && (
                <button onClick={() => onDeleteReview(review)}>Delete</button>
              )}
            </div>
          );
        })
      ) : (
        <p>Be the first to post a review!</p>
      )}
    </div>
  );
}
