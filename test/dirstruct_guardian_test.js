'use strict';

var grunt = require('grunt');
var API = require('../tasks/api');



exports.dirstruct_guardian = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    checkOptions: function (test) {
        test.expect(1);
        var actual = API.checkOptions({});
        test.deepEqual(actual, {allowed: []}, 'should ensure that "allowed" option is set');
        test.done();
    },
    allowFile: function (test) {
        test.expect(1);
        var file = {
            allowed: ['.js', '.css'],
            src: ['megadir/onemore/script.js']
        };
        var actual = API.isFileAllowed(file);
        test.equal(actual, true, 'should allow files which have extension in the allowed list');
        test.done();
    },
    disallowFile: function (test) {
        test.expect(1);
        var file = {
            allowed: ['.js', '.css'],
            src: ['megadir/onemore/script.exe']
        };
        var actual = API.isFileAllowed(file);
        test.equal(actual, false, 'should NOT allow files which don\'t have extension in the allowed list');
        test.done();
    }
};
