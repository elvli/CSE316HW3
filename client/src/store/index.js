import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

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
    CREATE_NEW_SONG: "CREATE_NEW_SONG",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    CLOSE_MODAL: "CLOSE_MODAL",
}

// 
const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
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
        currentModal : CurrentModal.NONE,
        markedList: null,
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
                    currentModal : CurrentModal.NONE,
                    markedList: null,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal : CurrentModal.NONE,
                    markedList: null,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    currentModal : CurrentModal.NONE,
                    markedList: null,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal : CurrentModal.NONE,
                    markedList: null,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal : CurrentModal.DELETE_LIST,
                    markedList: payload,
                });
            }
            case GlobalStoreActionType.DELETE_PLAYLIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal : CurrentModal.NONE,
                    markedList: store.markedList,
                })
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal : CurrentModal.NONE,
                    markedList: null,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    currentModal : CurrentModal.NONE,
                    markedList: null,
                }); 
            }
            // CREATE A NEW SONG
            case GlobalStoreActionType.CREATE_NEW_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    currentModal : CurrentModal.NONE,
                    markedList: null,
                });
            }
            case GlobalStoreActionType.CLOSE_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    currentModal : CurrentModal.NONE,
                    markedList: null,
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
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }
    store.closeModal = (modal) => {
        document.getElementById(modal).classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.CLOSE_MODAL,
            payload: null,
        })
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
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
    store.getPlaylistSize = function () {
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
            let listName = "Untitled" + (store.newListCounter + 1);
            const response = await api.createPlaylist({name: listName, songs: []});

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
        // store.loadIdNamePairs();
    }

    store.deletePlaylist = function (modal) {
        if(store.markedList){
            store.closeModal(modal);
            async function asyncDeletePlaylist(){
                let id = store.markedList._id;
                const response = await api.deletePlaylist(id);
                if (response.data.success){
                    storeReducer({
                        type: GlobalStoreActionType.DELETE_PLAYLIST,
                        payload: null
                    });
                        
                    store.loadIdNamePairs();
                }
            }
            asyncDeletePlaylist();
        }
        
    }

    store.markListForDeletion = function (id) {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: id
        });
    }

    store.getMarkedListName = function () {
        if (store.markedList){
            return store.markedList.name;
        }
    }

    store.setIsListNameEditActive = function () {
        console.log("store.setIsListNameEditActive() was called");
    }

    store.createSong = function (id) {
        async function asyncCreateSong() {
            const response = await api.createSong(id);

            if (response.data.success) {
                let playlist = response.data.playlist;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_SONG,
                        payload: playlist
                    });
                }
            }
        }
        asyncCreateSong(id);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}