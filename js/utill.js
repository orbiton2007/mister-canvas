function makeId(length=5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    try {
        localStorage.setItem(key, strValue);
    } catch(err) {
        if (err.code === 22) {
            console.log('Local Storage Full');
            
        }
    }
}
function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }