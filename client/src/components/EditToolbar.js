import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function handleCreateSong(){
        if (store.currentList){
            let song = {
                "title": "Untitled",
                "artist": "Unknown",
                "youTubeId": "dQw4w9WgXcQ"
            };
            store.addCreateSongTransaction(store.getPlaylistSize(), song);
        }
    }

    let editStatus = true;
    if (store.currentList) {
        editStatus = false;
    }

    // if (!store.hasTransactionToUndo()) {
    //     document.getElementById('undo-button').classList.remove("disabled");
    // }
    // else {
    //     document.getElementById('undo-button').classList.add("disabled");
    // }

    // if (!store.hasTransactionToRedo()) {
    //     document.getElementById('redo-button').classList.remove("disabled");
    // }
    // else {
    //     document.getElementById('redo-button').classList.add("disabled");
    // }
    // if (!editStatus) {
    //     document.getElementById('add-song-button').classList.remove("disabled");
    //     document.getElementById('close-button').classList.remove("disabled");
    // }
    // else {
    //     document.getElementById('add-song-button').classList.add("disabled");
    //     document.getElementById('close-button').classList.add("disabled");
    // }
    
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                onClick={handleCreateSong}
                className={enabledButtonClass}
            />
            <input
                type="button"
                id='undo-button'
                disabled={!store.hasTransactionToUndo()}
                value="⟲"
                className={enabledButtonClass}
                onClick={handleUndo}

            />
            <input
                type="button"
                id='redo-button'
                disabled={!store.hasTransactionToRedo()}
                value="⟳"
                className={enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={enabledButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;