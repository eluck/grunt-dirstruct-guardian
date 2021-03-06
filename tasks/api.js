var path = require('path');
var fs = require('fs');
var colors = require('colors');

module.exports = {
    checkFiles: function(filesAndDirs, isFile) {
        var files = filesAndDirs.filter(isFile || this.isFile);
        var self = this;
        return files.reduce(function (memo, curr) {
            curr = self.normalizeOptions(curr);
            if (!self.isFileAllowed(curr)) {
                memo.push(curr.src[0]);
            }
            return memo;
        },[]);
    },

    warn: function(disallowedFiles, grunt) {
        disallowedFiles.forEach(function(file) {
            var dir = path.dirname(file) === '.' ? 'root'.green : '"' + path.dirname(file).green + '"';
            grunt.log.warn('dirstruct-guardian: File "' +
                path.basename(file).red + '" is not allowed in the ' +
                 dir + ' directory.');
        });
    },

    fail: function(grunt) {
        grunt.fail.fatal('dirstruct-guardian: aborting grunt task. ' +
            'Remove disallowed files found or use "options { fail: false }" to prevent failing');
    },

    normalizeOptions: function(f) {
        if (!f.allowed) {
            f.allowed = [];
        }
        return f;
    },

    isFileAllowed: function(f) {
        return f.allowed.indexOf(path.extname(f.src[0])) !== -1;
    },

    isFile: function(f) {
        return fs.lstatSync(f.src[0]).isFile();
    }
};