import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * createSong_Transaction
 * 
 * This class represents a transaction that works creating and
 * deleting songs. It will be managed by the transaction stack.
 * 
 * @author Elven Li
 */
export default class deleteSong_Transaction extends jsTPS_Transaction {
    constructor(store, index, song) {
        super();
        this.store = store
        this.index = index;
        this.song = song;
    }

    doTransaction() {
        this.store.deleteSong(this.index);
    }
    
    undoTransaction() {
        this.store.createSong(this.index, this.song);
    }
}