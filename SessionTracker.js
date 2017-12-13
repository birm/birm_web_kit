// SESSION TRACKING

class SessionTracker{
  constructor(name){
    this.name = name;
  }
  store(){
    // store the current time or some proxy
    var now = Date.now();
    window.localStorage.setItem(this.name + "-lastauth", now);
  }
  start(interval, timeout, renewFcn){
    // TODO doc that interval and timeout are in ms
    var a = function(){
      var lastauth = window.localStorage.getItem(this.name + "-lastauth");
      var now = Date.now();
      if (now - lastauth >= timeout - (2*interval)){
        // TODO maybe make an event object to pass to renew fcn?
        renewFcn();
        this.store();
      }
    }
    var b = a.bind(this);
    window.setInterval(b, interval);
  }

}

/*
var st = new SessionTracker("myApp");
st.store(); // initial authorization tracked.
// check minutely and renew by 10 minutes
st.start(60000, 600000, function(){console.log("renewed!")});
*/
