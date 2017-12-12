var EventReg = {};
// on a key press, do the callbacks for that key
object.addEventListener("keypress",function(e){
  var cb = EventReg[e.key];
  // if it's one function run it
  if(cb instanceof Function){
    cb(e);
  }
  else{
    for (a in cb){
      cb[a](e);
    }
  }
});

// TO USE : Assign a list or function to the key within the registry.
