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

    // let playlistName = store.

    let enabledButtonClass = "playlister-button";

    return (
        <div 
            className="modal" 
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-list-root'>
                    <div className="modal-north">
                        Delete playlist?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete the {} playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            className="modal-button" 
                            onClick={deleteListCallback}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            className="modal-button" 
                            onClick={hideDeleteListModalCallback}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteListModal;