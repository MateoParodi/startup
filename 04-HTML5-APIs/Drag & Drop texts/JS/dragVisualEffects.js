var dropZone = document.getElementById('drop_zone');

/**
 * Visual effect of drag&box when file drags over
 * @returns {boolean}
 */
dropZone.ondragover = function () {
    this.className = 'drop_zone dragover';
    return false;
};




/**
 * Visual effect of drag&box when file drags leaves
 * @returns {boolean}
 */
dropZone.ondragleave = function () {
    this.className = 'drop_zone';
    return false;
};





/**
 * Visual effect of drag&box when file drops in
 * @returns {boolean}
 */
dropZone.ondrop = function () {
    this.className = 'drop_zone';
    return false;
};
