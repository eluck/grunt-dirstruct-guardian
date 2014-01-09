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
    grunt.registerMultiTask('dirstruct_guardian', 'Watches that certain filetypes lie in associated directories, e.g. .js-files in the "js" dir.', function () {
        var options = this.options({
            fail: false
        });

        var disallowed = API.checkFiles(this.files);
        if (disallowed.length > 0) {
            API.warn(disallowed, grunt);
            if (options.fail) {
                API.fail(grunt);
            }
        }
    });
};
