export default function Reviews({ reviews }) {
    console.log('this is review=>>',reviews)
    return (
        <div>
            {reviews && reviews.length >0 ? (
                reviews.map(review=>(
                    <div key={review.id} className="review-item">
                        <p>{review.User.firstName} · {review.createdAt}</p>
                        <p>{review.review}</p>
                    </div>
                ))
            ):(
                <p>Be the first to post a review!</p>
            )}
        </div>
    )
}
