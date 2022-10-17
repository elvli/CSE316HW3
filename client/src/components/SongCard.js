import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {

    const { store } = useContext(GlobalStoreContext);
    const [ isDragging, setisDragging ] = useState(false);
    const [ draggedTo, setdraggedTo ] = useState(false);
    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    function handleDragStart(event) {
        event.dataTransfer.setData("song", props.index);
        setisDragging(true);
        setdraggedTo(draggedTo);
    }

    function handleDragOver(event) {
        event.preventDefault();
        setisDragging(isDragging);
        setdraggedTo(true);
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setisDragging(isDragging);
        setdraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setisDragging(isDragging);
        setdraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = props.index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setisDragging(false);
        setdraggedTo(false);

        // ASK THE MODEL TO MOVE THE DATA
        //store.moveSong(sourceIndex, targetIndex);
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }

    function handleDeleteSong(event) {
        store.markSongForDeletion({song: song, index: index});
    }

    function handleEditSong(event) {
        store.markSongForEdit({song: song, index: index});
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDoubleClick={handleEditSong}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleDeleteSong}
            />
        </div>
    );
}

export default SongCard;