/*
 * grunt-dirstruct-guardian
 * https://github.com/eluck/grunt-dirstruct-guardian
 *
 * Copyright (c) 2014 eluck
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('dirstruct_guardian', 'Watches that certain filetypes lie in associated directories, e.g. .js-files in the "js" dir.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            fail: false
        });

        // Iterate over all specified file groups.
        this.files.filter(function (f) {
            return fs.lstatSync(f.src[0]).isFile();
        }).forEach(function (f) {

            var filePath = f.src[0];
            f.allowed || (f.allowed = []);

            if (f.allowed.indexOf(path.extname(filePath))) {
                grunt.verbose.error();
                var message = 'File "' + path.basename(filePath) + '" is not allowed in the "' + path.dirname(filePath) + '" directory';
                if (options.fail) {
                    grunt.fail.warn(message);
                } else {
                    grunt.log.warn(message);
                }
            }
        });
    });

};
