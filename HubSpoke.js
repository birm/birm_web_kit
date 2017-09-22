/* Spoke
 * @constructor
 * @param hub_id - the hub's hash, and this item's base hash
 * @param id - identifier for the spoke given the parent
 * @param callback - what to do with new information
 */
class Spoke {
    constructor(hub_id, id, callback) {
        this.hub_id = hub_id
        this.id = hub_id + "-" + id;
        this.callback = callback;
        this._state = "";
    }

    cats(event){
      // TODO why is {this} a window
      console.log(this);
      if (event.key == this.hub_id) {
          this._state = event.newValue;
      }
    }

    set state (value) {
        /* set this spoke's state */
        this._state = value;
        window.localStorage.setItem(this.id, value);
    }
    get state() {
        /* get parent state */
        // the last hub state is the state we need alyways
        return window.localStorage.getItem(this.hub_id);
    }

}

/* Hub
 * @constructor
 * @param callback - what to do with new information
 */
class Hub {
    constructor(callback) {
        this.spokes = [];
        this._state = "";
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
        this.id = hash;
    }

    cats(event){
      // TODO why is {this} a window
      console.log(this);
      if (this.spokes.includes(event.key)) {
          this._state = event.newValue;
      }
    }

    register_spoke(id) {
        /* Add a Spoke
         *@param id - the id to use for the spoke
         */
        this.spokes.push(id);
    }
    set state(value) {
        /* set this hub's state */
        this._state = value;
        window.localStorage.setItem(this.id, value);
    }
    get state(){
      // TODO update this._state with new registerable events
      // the state is the last updated of all states
      return this._state;
    }

}
