function customAjax(config) {

    // config.url must be defined in config object
    if(typeof config.url == 'undefined') {
        return false;
    }

    var url = config.url;
    // if config.method is undefined, use GET as default
    var method = (typeof config.method != "undefined") ? config.method : "GET";

    var promise = new Promise(function(resolve, reject) {

        $.ajax({
            url : url,
            type : method,
            success: function(response) {
                resolve(response);
            },
            error: function() {
                reject();
            }
        });

    });

    return promise;
}

function clickMe() {
    var promise = customAjax({
        url : "http://api.icndb.com/jokes/random",
        method : "GET"
    });

    promise.then(function(response) {

        document.getElementById("text").innerHTML = response.value.joke;

    }).catch(function() {
        document.getElementById("text").innerHTML = "Ups! Error ocurrs!";
        document.getElementById("text").style.color = "red";
    });
}
