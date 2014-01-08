/*
 * grunt-dirstruct-guardian
 * https://github.com/eluck/grunt-dirstruct-guardian
 *
 * Copyright (c) 2014 eluck
 * Licensed under the MIT license.
 */

'use strict';

var API = require('./api');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('dirstruct_guardian', 'Watches that certain filetypes lie in associated directories, e.g. .js-files in the "js" dir.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            fail: false
        });

        // Iterate over all specified file groups.
        this.files.filter(API.isFile).forEach(
            function (f) {
                f = API.checkOptions(f);
                if (!API.isFileAllowed(f))
                {
                    grunt.verbose.error();
                    var message = 'File "' + API.getFileName(f) + '" is not allowed in the "' + API.getFilePath(f) + '" directory';
                    if (options.fail) {
                        grunt.fail.warn(message);
                    } else {
                        grunt.log.warn(message);
                    }
                }
            }
        );
    });
};
