
import './DeleteReviewModal.css'
export default function DeleteReviewModal({ review, onCancel, onConfirm }) {


  return (
    <div className="delete-confirmation-modal">
      <div className='delete-spot-title'>Confirm Delete</div>
      <div className='delete-spot-text'>Are you sure you want to delete this review?</div>
      <br></br>
      <div className='yes'>
      <button onClick={() => onConfirm(review) }>Yes (Delete Review)</button>
      </div>
      <br></br>
      <div className='no'>
        <button onClick={onCancel}>No (Keep Review)</button>
</div>
    </div>
  )
}
