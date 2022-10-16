import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This modal allows the user to comfirm or cancel
    the delete song function.
    
    @author Elven Li
*/
function DeleteSongModal(){
    const { store } = useContext(GlobalStoreContext);

    function handleConfirm(event) {
        event.stopPropagation();
        store.deleteSong("delete-song-modal");
    }

    function handleCancel(event) {
        event.stopPropagation();
        store.closeModal("delete-song-modal");
    }

    let modal = 
    <div
        id="delete-song-modal"
        className={modalClass}
        data-animation="slideInOutLeft">
        <div className="modal-root" id='verify-delete-song-root'>
            <div className="modal-north">
                Remove {store.getMarkedSongName()}?
            </div>
            <div className="modal-center">
                <div className="modal-center-content">
                    Are you sure you wish to permanently remove {store.getMarkedSongName()} from the playlist?
                </div>
            </div>
            <div className="modal-south">
                <input type="button" id="delete-song-confirm-button" className="modal-button" onClick={this.handleConfirmRemoveSong} value='Confirm' />
                <input type="button" id="delete-song-cancel-button" className="modal-button" onClick={this.handleCancelRemoveSong} value='Cancel' />
            </div>
        </div>
    </div>

    if(store.isDeleteListModalOpen()) {
        document.getElementById("delete-song-modal").classList.add('is-visible');
    }
    return (
        modal
    );
}

export default DeleteSongModal;