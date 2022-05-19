'use strict';


function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
function utils() {
    // TODO
    console.log('utils')
}
module.exports = {
    isObject
};