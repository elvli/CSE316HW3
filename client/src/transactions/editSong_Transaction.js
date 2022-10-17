import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * createSong_Transaction
 * 
 * This class represents a transaction that works creating and
 * deleting songs. It will be managed by the transaction stack.
 * 
 * @author Elven Li
 */
export default class editSong_Transaction extends jsTPS_Transaction {
    constructor(store, index, oldSong, newSong) {
        super();
        this.store = store
        this.index = index;
        this.oldSong = oldSong;
        this.newSong = newSong;
    }

    doTransaction() {
        this.store.editSong(this.index, this.newSong);
    }
    
    undoTransaction() {
        this.store.editSong(this.index, this.oldSong);
    }
}