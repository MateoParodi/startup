var db;
var fileLength;
var files;
/**
 *
 * Creates indexedDB.
 *
 */
function start() {
    
    var btnSave = document.getElementById('btnSave');

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

/**
 *
 * Creates objectStore and adds objects(file name in this case),
 * into indexedDB and localStorage.
 *
 */
function addObject() {

    var id = document.getElementById('id').value;

    if(id === ''){
        return;
    }

    var transaction = db.transaction(['texts'],'readwrite');

    var almacen = transaction.objectStore('texts');

    //save in IndexedDB
    var add = almacen.add({id: id, text: file});
    //save in LocalStorage
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

/**
 *
 * Print file info (Type, Size, Name, Last modified date)
 *
 */
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    files = evt.dataTransfer.files;
    fileLength = files.length;
    file = files[0].name;

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<img src="/Resources/txt-icon.png" class="imgText">','</img>','<strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}


/**
 *
 * Prints file content when 'Read File' button pressed.
 *
 */
function readBlob(opt_startByte, opt_stopByte) {

    if (files === undefined) {
        alert('Please drag a file!');
        return;
    }

    var file = files[0];

    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
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

/**
 *
 * Cancel reading file when 'Cancel Read' button pressed.
 *
 */
function abortRead() {
    document.getElementById('byte_content').textContent = '';
}


/**
 *
 * Setup listeners
 *
 */
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('drop', handleFileSelect, false);

window.addEventListener('load', start, false);