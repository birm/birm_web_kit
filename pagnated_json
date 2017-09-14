pagnated_json = function(url_generator, callback, finalizer) {
        // url_generator can be either a generator (recommended) or an iterator
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url_generator.next().value, true);
            xhr.onload = function(e) {
                if (xhr.readyState === 4 && xhr.responseText) {
                    // if it's not blank, process records and recurse
                    var records = JSON.parse(xhr.responseText);
                    if (records['data'].length > 0) {
                        callback(records);
                        // recurse and add new request
                        //xhr.open("GET", url_generator.next().value, true);
                        pagnated_json(url_generator, callback);
                    }
                }
            }
            xhr.send();
        } catch (e) {
            console.log(e);
        }
        // if the url geneator is done, or response is empty, terminate
    }
