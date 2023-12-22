import './DeleteSpotModal.css'
export default function DeleteConfirmationModal({ onConfirm, onCancel }) {

    return(
        <div className="delete-confirmation-modal">
            <div className='delete-spot-title'>Confirm Delete</div>
            <div className='delete-spot-text'>Are you sure you want to remove this spot from the listings?</div>
            <br></br>
            <div className='yes'><button onClick={onConfirm}>Yes (Delete Spot)</button></div>
            <br></br>
            <div className='no'><button onClick={onCancel}>No (Keep Spot)</button></div>
        </div>
    )
}
