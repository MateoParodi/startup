var db;
/**
 *
 * Creates indexedDB.
 *
 */
function start() {
    
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

/**
 *
 * Creates objectStore and adds objects(text in textarea in this case),
 * into indexedDB and localStorage.
 *
 */
function addObject() {

    var textSaved = document.getElementById('text').value;

    var id = document.getElementById('id').value;

    var transaction = db.transaction(['texts'],'readwrite');

    var almacen = transaction.objectStore('texts');

    var add = almacen.add({id: id, text: textSaved});

    window.localStorage.setItem(id, textSaved);

    document.getElementById('id').value='';
    document.getElementById('text').value='';
}




/**
 *
 * Removes all data from localStore and indexedDB when remove button is pressed
 *
 */
function removeAll() {

    window.localStorage.clear();
    window.indexedDB.deleteDatabase('database');
    location.reload();
}


window.addEventListener('load', start, false);