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
                    { allowed: ['.js'], cwd: 'test/fixture', src: ['js/**', 'jss/*'], expand: true }
                ]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            }

        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    //Add tests for travis CI
    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('debug', ['dirstruct_guardian']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'mochaTest']);
};
