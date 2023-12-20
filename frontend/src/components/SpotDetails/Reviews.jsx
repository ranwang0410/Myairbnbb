
import { useSelector } from "react-redux";

export default function Reviews({ reviews, onDeleteReview }) {
  const sessionUser = useSelector((state) => state.session.user);
  // console.log(reviews, 'this is the review')
  const sortedReviews = reviews?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  // console.log(sortedReviews, 'sorted reviews')
  return (
    <div>
      {sortedReviews && sortedReviews.length > 0 ? (
        sortedReviews.map((review) => {
          const isCurrentUserReview =
            sessionUser && review.User?.id === sessionUser.id;

          // console.log(review.User?.firstName, '=>iscurrent')
          // console.log(sessionUser, 'session user')
          // console.log(review.createdAt, 'time')

          let time = review.createdAt;
          let date = new Date(time);

          // console.log(date, 'date')

          let options = {
            year: 'numeric',
            month: 'long'
          }
          // console.log(date.toLocaleDateString(undefined, options))


          return (
            <div key={review.id} className="review-item">
              <p>
                {review.User?.firstName ? review.User.firstName : sessionUser.firstName} · {date.toLocaleDateString(undefined, options)}
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
