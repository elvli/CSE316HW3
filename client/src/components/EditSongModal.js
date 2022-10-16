import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleConfirmModal(event){
        event.stopPropagation();
        let newTitle = document.getElementById("edit-song-title").value;
        let newArtist = document.getElementById("edit-song-artist").value;
        let newYouTubeId = document.getElementById("edit-song-youTubeId").value;
        let song = { "title": newTitle,
            "artist": newArtist,
            "youTubeId": newYouTubeId
        };
        store.editSong(store.getMarkedSongIndex(), song);
    }

    function handleCancelModal(event){
        event.stopPropagation();
        store.closeModal("edit-song-modal");
    }

    let modal = 
    <div 
        className="modal" 
        id="edit-song-modal" 
        data-animation="slideInOutLeft">
        <div className="modal-root" id='verify-edit-song-root'>
            <div className="modal-north">
                Edit Song
            </div>
            <div className="modal-center">
                <div className="modal-center-content">
                    Title: <input class="modal-text-input" type="text" id="edit-song-title" defaultValue=""/><br/>
                    Artist: <input class="modal-text-input" type="text" id="edit-song-artist" defaultValue=""/><br/>
                    You Tube Id: <input class="modal-text-input" type="text" id="edit-song-youTubeId" defaultValue=""/><br/>
                </div>
            </div>
            <div className="modal-south">
                <input type="button" 
                    id="edit-song-confirm-button" 
                    className="modal-button" 
                    onClick={handleConfirmModal}
                    value='Confirm' />
                <input type="button" 
                    id="edit-song-cancel-button" 
                    className="modal-button" 
                    onClick={handleCancelModal}
                    value='Cancel' />
            </div>
        </div>
    </div>

    if (store.isEditSongModalOpen()) {
        document.getElementById("edit-song-modal").classList.add("is-visible");
        document.getElementById("edit-song-title").value = store.getMarkedSongTitle();
        document.getElementById("edit-song-artist").value = store.getMarkedSongArtist();
        document.getElementById("edit-song-youTubeId").value = store.getMarkedSongYouTubeId();
    }

    return (modal);
}
export default EditSongModal;