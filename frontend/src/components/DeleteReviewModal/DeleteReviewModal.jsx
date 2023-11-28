

export default function DeleteReviewModal({ review, onCancel, onConfirm }) {
  return (
    <div className="delete-review-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="modal-buttons">
      <button onClick={() => onConfirm(review) } style={{ backgroundColor: 'red' }}>Yes (Delete Review)</button>
        <button onClick={onCancel} style={{ backgroundColor: 'darkgrey' }}>No (Keep Review)</button>
      </div>
    </div>
  );
}
