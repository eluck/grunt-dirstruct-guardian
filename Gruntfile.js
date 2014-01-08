/*
 * grunt-dirstruct-guardian
 * https://github.com/eluck/grunt-dirstruct-guardian
 *
 * Copyright (c) 2014 eluck
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Exapmle config - not used here
        dirstruct_guardian: {
            options: {
                fail: true
            },
            js: {
                files: [
                    { allowed: ['.js'], src: ['js/**', 'jss/*'], expand: true }
                ]
            }
        },
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'nodeunit']);
};
