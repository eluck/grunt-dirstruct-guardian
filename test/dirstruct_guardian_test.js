'use strict';
var sinon = require('sinon');
var should = require('should');
var API = require('../tasks/api');

describe('dirstruct-guardian API', function() {
    describe('.normalizeOptions()', function() {

        it('should set allowed property to [] if it\'s not set', function() {
            var actual = API.normalizeOptions({});
            actual.should.have.property('allowed');
            actual.allowed.should.be.eql([]);
        });

    });

    describe('.fail(grunt)', function() {

        it('should call grunt.fail.warn', function() {
            var callback = sinon.spy();
            var gruntMock = { fail: { warn: callback } };
            API.fail(gruntMock);
            callback.calledOnce.should.be.true;
        });

    });

    describe('.warn(disallowedFiles, grunt)', function() {

        it('should call grunt.log.warn disallowedFiles\'s length times', function() {
            var disallowedFiles = [
                'path/file1',
                'path/file2',
                'path/file3'
            ];
            var callback = sinon.spy();
            var gruntMock = { log: { warn: callback } };
            API.warn(disallowedFiles, gruntMock);
            callback.callCount.should.be.eql(3);
        });

        it('should print "root" directory if a file has no path', function() {
            var disallowedFiles = [
                'file1'
            ];
            var callback = sinon.spy();
            var gruntMock = { log: { warn: callback } };
            API.warn(disallowedFiles, gruntMock);
            callback.args[0][0].should.match(/(root)/);
        });

    });

    describe('.checkFiles(filesAndDirs, isFile)', function() {

        it('should omit checking dirs', function() {
            var files = [
                { allowed: ['.js'], src: ['path'] },
                { allowed: ['.js'], src: ['path/file1'] },
                { allowed: ['.js'], src: ['path/file2'] },
                { allowed: ['.js'], src: ['path/file3'] }
            ];
            var disallowedFiles = API.checkFiles(files, function(obj) { return obj.src[0] !== 'path' });
            disallowedFiles.should.have.a.lengthOf(3);
        });

        it('should allow files without extension if such specified', function() {
            var files = [
                { allowed: [''], src: ['path'] },
                { allowed: [''], src: ['path/file1'] },
                { allowed: [''], src: ['path/file2.js'] },
                { allowed: [''], src: ['path/file3'] }
            ];
            var disallowedFiles = API.checkFiles(files, function(obj) { return obj.src[0] !== 'path' });
            disallowedFiles.should.have.a.lengthOf(1);
        });

        it('should disallow files with extension unlisted', function() {
            var files = [
                { allowed: ['.css'], src: ['path'] },
                { allowed: ['.css'], src: ['path/file1'] },
                { allowed: ['.css'], src: ['path/file2.js'] },
                { allowed: ['.css'], src: ['path/file3.css'] }
            ];
            var disallowedFiles = API.checkFiles(files, function(obj) { return obj.src[0] !== 'path' });
            disallowedFiles.should.have.a.lengthOf(2);
        });

        it('should return an empty array if no disallowed files found', function() {
            var files = [
                { allowed: ['.css'], src: ['path'] },
                { allowed: ['.css'], src: ['path/file1.css'] },
                { allowed: ['.css'], src: ['path/file2.css'] },
                { allowed: ['.css'], src: ['path/file3.css'] }
            ];
            var disallowedFiles = API.checkFiles(files, function(obj) { return obj.src[0] !== 'path' });
            disallowedFiles.should.have.a.lengthOf(0);
        });

        it('should return an empty array if it\'s fed with empty array', function() {
            var files = [];
            var disallowedFiles = API.checkFiles(files, function(obj) { return obj.src[0] !== 'path' });
            disallowedFiles.should.have.a.lengthOf(0);
        });
    });

});