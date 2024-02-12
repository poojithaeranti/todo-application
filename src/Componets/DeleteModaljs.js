import React from 'react'
import Modal from 'react-responsive-modal'
function DeleteModaljs({ isDeleteModal, setDeleteModal, confirmDelete }) {
    return (
        <div>
            <Modal open={isDeleteModal} onClose={() => setDeleteModal(false)}>
                <h1>Confirmation</h1>
                <div>Are you sure you want to delete?</div>
                <button onClick={confirmDelete} className='confirm'>Confirm</button>
                <button onClick={() => setDeleteModal(false)} className='deletecancel'>Cancel</button>
            </Modal>
        </div>
    )
}

export default DeleteModaljs
