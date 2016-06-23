var db;

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

    var textSaved = document.getElementById('drop_zone').value;

    var id = document.getElementById('id').value;

    var transaction = db.transaction(['texts'],'readwrite');

    var almacen = transaction.objectStore('texts');

    var add = almacen.add({id: id, text: textSaved});


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

    var files = evt.dataTransfer.files; // FileList object.

    file = files[0].name;

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
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