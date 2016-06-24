var db;
var fileLength;
var files;
function start() {

    dataZone = document.getElementById('data');
    btnSave = document.getElementById('btnSave');

    btnSave.addEventListener('click', addObject, false);

    var createDb = indexedDB.open('database');

    createDb.onsuccess=function (e) {
        db = e.target.result;
    };

    createDb.onupgradeneeded=function (e) {
        db = e.target.result;
        db.createObjectStore('texts', {keyPath: 'id'});
    };

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}


function addObject() {

    var id = document.getElementById('id').value;

    if(id === ''){
        return;
    }


    var transaction = db.transaction(['texts'],'readwrite');

    var almacen = transaction.objectStore('texts');

    var add = almacen.add({id: id, text: file});


    window.localStorage.setItem(id, file);
}




/**
 *
 * Removes all data from localStore and indexedDB when remove button is pressed
 *
 */
function removeAll() {

    window.localStorage.clear();
    window.indexedDB.deleteDatabase('database');
}






function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    files = evt.dataTransfer.files; // FileList object.
    fileLength = files.length;
    file = files[0].name;

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<img src="/Resources/txt-icon.png" class="imgText">','</img>','<strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function abortRead() {
    document.getElementById('byte_content').textContent = '';
}

function readBlob(opt_startByte, opt_stopByte) {

    if (files === undefined) {
        alert('Please drag a file!');
        return;
    }


    var file = files[0];

    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            document.getElementById('byte_content').textContent = evt.target.result;
            document.getElementById('byte_content').style.display = 'block';
        }
    };



    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
}

document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
    if (evt.target.tagName.toLowerCase() == 'button') {
        readBlob(null, null);
    }
}, false);



var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function(){ div.style.display = "none"; }, 600);
    }
}


function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');

dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);


window.addEventListener('load', start, false);