var path = require('path');
var fs = require('fs');

exports.getFilePath = function(f) {
    return path.dirname(f.src[0]);
};

exports.getFileName = function(f) {
    return path.basename(f.src[0]);
};

exports.checkOptions = function(f) {
    f.allowed || (f.allowed = []);
    return f;
};

exports.isFileAllowed = function(f) {
    return f.allowed.indexOf(path.extname(f.src[0])) !== -1;
};

exports.isFile = function(f) {
    return fs.lstatSync(f.src[0]).isFile();
};