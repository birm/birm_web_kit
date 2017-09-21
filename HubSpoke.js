/* Spoke
 * @constructor
 * @param parent - the parent's hash
 * @param id - identifier for the spoke given the parent
 */
class Spoke {
    // TODO more sensible method names
    constructor(parent, id) {
      this.parent = parent
      this.id = id;

    }
    // TODO this needs a way to communicate
    // TODO this needs to listen to its parent
}

/* Hub
 * @constructor
 * @param prefix - the prefix for the state url component (i.e. ?{prefix}=abc)
 */
class Hub {
    // TODO more sensible method names
    constructor() {
      this.spokes = [];
      // INSECURE HASH FUNCTION to avoid collision
      var dt = new Date().toString(),
          hash = 0;
      for (var i = 0; i < dt.length; i++) {
          var char = dt.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
          hash = Math.abs(hash);
      }
      this.hash = hash;

    }

    add_spoke(id){
      /* Add a Spoke
       *@param id - the id to use for the spoke
       */
       let newspoke = new Spoke(this.hash, this.id);
       this.spokes.push(newspoke);
       // TODO add listen to this new spoke
    }
    // TODO this needs a way to communicate
    // TODO this needs to listen to a spoke
}
