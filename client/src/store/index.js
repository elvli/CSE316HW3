import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import createSong_Transaction from '../transactions/createSong_Transaction.js';
import deleteSong_Transaction from '../transactions/deleteSong_Transaction.js';
import editSong_Transaction from '../transactions/editSong_Transaction.js';
export const GlobalStoreContext = createContext({});

// OUR TRANSACTIONS
// import MoveSong_Transaction from './transactions/MoveSong_Transaction.js';
// import RemoveSong_Transaction from './transactions/RemoveSong_Transaction.js';
// import EditSong_Transaction from './transactions/EditSong_Transaction.js';
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/
const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    DELETE_SONG : "DELETE_SONG"
}
// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    DELETE_PLAYLIST: "DELETE_PLAYLIST",
    MARK_LIST: "MARK_LIST",
    CURRENT_OPEN_MODAL: "CURRENT_OPEN_MODAL",
    CLOSE_MODAL: "CLOSE_MODAL",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markDeleteList: null,
        currentModal: CurrentModal.NONE,
        markDeleteSong: null,
        editMode: false,
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: null,
                    currentModal: CurrentModal.NONE,
                    markDeleteSong: null,
                    editMode: false,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: null,
                    currentModal: CurrentModal.NONE,
                    markDeleteSong: null,
                    editMode: false,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    markDeleteList: null,
                    currentModal: CurrentModal.NONE,
                    markDeleteSong: null,
                    editMode: true,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: null,
                    currentModal: CurrentModal.NONE,
                    markDeleteSong: null,
                    editMode: false,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    markDeleteList: payload,
                    currentModal: CurrentModal.NONE,
                    markDeleteSong: null,
                    editMode: false,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: null,
                    currentModal: CurrentModal.NONE,
                    markDeleteSong: null,
                    editMode: false,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    markDeleteList: null,
                    currentModal: CurrentModal.NONE,
                    markDeleteSong: null,
                    editMode: false,
                });
            }
            // delting a playlist
            case GlobalStoreActionType.DELETE_PLAYLIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: null,
                    currentModal: CurrentModal.NONE,
                    markDeleteSong: null,
                    editMode: false,
                })
       
            }// OPENS THE DELETE PLAYLIST MODAL
            case GlobalStoreActionType.CURRENT_OPEN_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: payload,
                    currentModal: CurrentModal.DELETE_LIST,
                    markDeleteSong: null,
                    editMode: false,
                });
            }

            case GlobalStoreActionType.CLOSE_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: null,
                    currentModal: CurrentModal.NONE,
                    markDeleteSong: null,
                    editMode: false,
                });
            }

            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: null,
                    currentModal: CurrentModal.DELETE_SONG,
                    markDeleteSong: payload,
                    editMode: false,
                });
            }

            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeleteList: null,
                    currentModal: CurrentModal.EDIT_SONG,
                    markDeleteSong: payload,
                    editMode: false,
                });
            }

            default:
                return store;
        }
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isDeleteSongModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_SONG;
    }
    store.closeModal = (modal) => {
        document.getElementById(modal).classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.CLOSE_MODAL,
            payload: null,
        })
    }
    store.moveSong = function (sourceIndex, newIndex) {
        async function asyncChangeListName() {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                console.log(response)
                let playlist = response.data.playlist;
                let swap = playlist.songs[sourceIndex]
                playlist.songs[sourceIndex] = playlist.songs[newIndex]
                playlist.songs[newIndex] = swap
                async function updateList(playlist) {
                    let update = 
                    {   _id: playlist._id,
                        playlist: playlist
                    }
                    response = await api.updatePlaylistById(update);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName();
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id._id);
            if (response.data.success) {
                console.log(response)
                let playlist = response.data.playlist;
                console.log(playlist)
                playlist.name = newName;
                async function updateList(playlist) {
                    let update = 
                    {   _id: playlist._id,
                        playlist: playlist
                    }
                    response = await api.updatePlaylistById(update);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            console.log(id)
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }

    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    store.createPlaylist = function () {
        async function asyncCreatePlaylist() {
            let id = "Untitled" + (store.newListCounter + 1)
            const response = await api.createPlaylist({name: id, songs: []});
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_LIST,
                        payload: playlist
                    });
                    store.newListCounter += 1;
                    store.loadIdNamePairs();
                }   
            }
        }
        asyncCreatePlaylist();
    }

    store.deletePlaylist = function () {
        async function asyncDeletePlaylist() {
            const response = await api.deletePlaylist(store.markDeleteList._id);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.DELETE_PLAYLIST,
                    payload: null
                });
                store.closeModal("delete-list-modal")
                store.loadIdNamePairs();
            }   
        }
        asyncDeletePlaylist();
    }

    store.markListForDeletion = function (id) { 
        storeReducer({
            type: GlobalStoreActionType.CURRENT_OPEN_MODAL,
            payload: id
        })
    }

    store.deletePlaylist = function () {
        async function asyncDeletePlaylist() {
            console.log(store.markDeleteList)
            const response = await api.deletePlaylist(store.markDeleteList._id);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.DELETE_PLAYLIST,
                    payload: null
                    });
                store.closeModal("delete-list-modal")
                store.loadIdNamePairs();
            }   
        }
        asyncDeletePlaylist();
    }

    store.createSong = function (index, song) {
        async function asyncChangeListName() {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                console.log(response)
                let playlist = response.data.playlist;
                console.log(playlist)
                playlist.songs.splice(index, 0, song);
                async function updateList(playlist) {
                    let update = 
                    {   _id: playlist._id,
                        playlist: playlist
                    }
                    response = await api.updatePlaylistById(update);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName();
    }

    store.deleteSong = function (index) {
        async function asyncChangeListName() {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.songs.splice(index, 1);
                async function updateList(playlist) {
                    let update = 
                    {   _id: playlist._id,
                        playlist: playlist
                    }
                    response = await api.updatePlaylistById(update);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName();
        store.closeModal("delete-song-modal")
    }

    store.editSong = function (index, song) {
        async function asyncChangeListName() {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.songs.splice(index, 1, song);
                async function updateList(playlist) {
                    let update = 
                    {   _id: playlist._id,
                        playlist: playlist
                    }
                    response = await api.updatePlaylistById(update);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName();
        store.closeModal("edit-song-modal")
    }

    store.addCreateSongTransaction = function (index, song) {
        let transaction = new createSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }

    store.addDeleteSongTransaction = function (index, song) {
        let transaction = new deleteSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }

    store.addEditSongTransaction = function (index, oldSong, newSong) {
        let transaction = new editSong_Transaction(store, index, oldSong, newSong);
        tps.addTransaction(transaction);
    }
    store.markSongForDeletion = function (songNameIndexPair) {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: songNameIndexPair
        })
    }

    store.markSongForEdit = function (songNameIndexPair) {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
            payload: songNameIndexPair
        })
    }

    store.getMarkedSong = () => {
        if(store.markDeleteSong) {
            return store.markDeleteSong.song;
        }
    }

    store.getMarkedSongTitle = () => {
        if(store.markDeleteSong) {
            return store.markDeleteSong.song.title;
        }
    }

    store.getMarkedSongArtist = () => {
        if(store.markDeleteSong) {
            return store.markDeleteSong.song.artist;
        }
    }

    store.getMarkedSongYouTubeId = () => {
        if(store.markDeleteSong) {
            return store.markDeleteSong.song.youTubeId;
        }
    }

    store.getMarkedSongIndex = () => {
        if(store.markDeleteSong) {
            return store.markDeleteSong.index;
        }
    }

    store.getMarkedListName = () => {
        if(store.markDeleteList) {
            return store.markDeleteList.name;
        }
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    store.setIsListNameEditActive = function (id) {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST,
            payload: id
        });
        store.setIsListNameEditActive = true;
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}