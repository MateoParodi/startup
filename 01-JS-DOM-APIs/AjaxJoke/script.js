// Function to fade-in text when page is load
function fade() {
    var t = document.getElementById('text');
    t.style.opacity =1;
}


//Function to 
function joke() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var json = JSON.parse(xhttp.responseText);
            document.getElementById("text").innerHTML = json.value.joke;
        }
    };
    xhttp.open("GET", "http://api.icndb.com/jokes/random", true);
    xhttp.send();
}   