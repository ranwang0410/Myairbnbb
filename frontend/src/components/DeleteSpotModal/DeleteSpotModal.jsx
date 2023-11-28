
export default function DeleteConfirmationModal({ onConfirm, onCancel }) {

    return(
        <div className="delete-confirmation-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot?</p>
            <button onClick={onConfirm} style={{ backgroundColor: 'red' }}>Yes (Delete Spot)</button>
            <button onClick={onCancel} style={{ backgroundColor: 'darkgrey' }}>No (Keep Spot)</button>
        </div>
    )
}
