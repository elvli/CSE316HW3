import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This modal allows the user to comfirm or cancel
    the delete playlist function.
    
    @author Elven Li
*/
function DeleteListModal(){
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    function handleConfirm(event) {
        event.stopPropagation();
        store.deletePlaylist("delete-list-modal");
    }

    function handleCancel(event) {
        event.stopPropagation();
        store.closeModal("delete-list-modal");
    }
    //stoer.marledlist
    // // let playlistName = store.
    let playlistName = store.getMarkedListName();

    let modal = <div 
    className="modal" 
    id="delete-list-modal" 
    data-animation="slideInOutLeft">
        <div className="modal-root" id='verify-delete-list-root'>
            <div className="modal-north">
                Delete playlist?
            </div>
            <div className="modal-center">
                <div className="modal-center-content">
                    Are you sure you wish to permanently delete the {playlistName} playlist?
                </div>
            </div>
            <div className="modal-south">
                <input type="button" 
                    id="delete-list-confirm-button" 
                    className="modal-button" 
                    value='Confirm'
                    onClick={handleConfirm} />
                <input type="button" 
                    id="delete-list-cancel-button" 
                    className="modal-button" 
                    value='Cancel' 
                    onClick={handleCancel}/>
            </div>
        </div>
</div>

    if(store.isDeleteListModalOpen()) {
        document.getElementById("delete-list-modal").classList.add('is-visible');
    }
    return (
        modal
    );
}

export default DeleteListModal;