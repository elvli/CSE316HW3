import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * createSong_Transaction
 * 
 * This class represents a transaction that works creating and
 * deleting songs. It will be managed by the transaction stack.
 * 
 * @author Elven Li
 */
export default class moveSong_Transaction extends jsTPS_Transaction {
    constructor(store, sourceIndex, targetIndex) {
        super();
        this.store = store;
        this.sourceIndex = sourceIndex;
        this.targetIndex = targetIndex;
    }

    doTransaction() {
        this.store.moveSong(this.sourceIndex, this.targetIndex);
    }
    
    undoTransaction() {
        this.store.moveSong(this.targetIndex, this.sourceIndex);
    }
}