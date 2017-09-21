/* Spoke
 * @constructor
 * @param hub_id - the hub's hash, and this item's base hash
 * @param id - identifier for the spoke given the parent
 * @param callback - what to do with new information
 */
class Spoke {
    constructor(hub_id, id, callback) {
      this.hub_id = hub_id
      this.id = id;
      this.callback = callback;
      let self = this;
      window.addEventListener('storage', function(e){
        // TODO if it's the hub, listen!
      });
    }
    set(value){
      /* set this spoke's state */
      window.localStorage.setItem(this.key, value);
    }
    get(){
      /* get parent state */
      return window.localStorage.getItem(this.hub_id);
    }

}

/* Hub
 * @constructor
  * @param callback - what to do with new information
 */
class Hub {
    // TODO more sensible method names
    constructor(callback) {
      this.spokes = [];
      this.callback = callback;
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
      window.addEventListener('storage', function(e){
        // TODO if it's a spoke, listen!
      });

    }

    register_spoke(id){
      /* Add a Spoke
       *@param id - the id to use for the spoke
       */
       let newspoke = this.hash + "-" + id;
       this.spokes.push(newspoke);
       // TODO add listen to this new spoke
    }
    set(value){
      /* set this hub's state */
      window.localStorage.setItem(this.hash, value);
    }
    // TODO this needs to listen to its spokes
    listen(callback){
      // TODO set up listen callback event
    }
}
