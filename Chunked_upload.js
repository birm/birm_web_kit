var chunkSize = 64*1024;

// read a chunk of the file
function promiseChunkFileReader(file, part){
  return new Promise((resolve, reject)=>{
    var fr = new FileReader();
    fr.onload = (evt)=>{
      if (evt.target.error == null) {
        let d = evt.target.result.split(',')[1]
        if(d){
          resolve(d)
        } else {
          reject("Done Reading")
        }
      } else {
        reject(evt.target.error)
      }
    };
    var blob = file.slice(part*chunkSize, (part+1)*chunkSize);
    fr.readAsDataURL(blob);
  })
}

// read chunks one at a time
async function readFileChunks(file, token){
  var part = 0;
  var complete = false;
  while (!complete){
    try{
      let data = await promiseChunkFileReader(file, part)
      // DO SOMETHING WITH IT
      part++
      console.log(part)
    } catch(e) {
      console.log(e)
      // DEAL WITH ERROR/"Done Reading" msg
      complete = true
    }
  }
}
