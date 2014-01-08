# grunt-dirstruct-guardian [![Build Status](https://travis-ci.org/eluck/grunt-dirstruct-guardian.png?branch=master)](https://travis-ci.org/eluck/grunt-dirstruct-guardian)

> Watches that certain filetypes lie in associated directories, e.g. .js-files in the 'js' dir.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dirstruct-guardian --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dirstruct-guardian');
```
Or better use [matchdep](https://github.com/tkellen/node-matchdep) if you tired of including tons of "loadNpmTasks".


## The "dirstruct_guardian" task

### Overview
In your project's Gruntfile, add a section named `dirstruct_guardian` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    dirstruct_guardian: {
        task1: {
            files: [
                { allowed: ['.js', '.coffee'], src: ['a/path/regarding/root', 'another/path/regarding/root'], expand: true }
            ]
        },
        task2: {
            files: [
                { allowed: ['.css', '.less'], cwd: 'path/regarding/root', src: ['path/regarding/cwd', expand: true }
            ]
        }
    },
});
```
All rules are applied independently.

### Options

#### options.fail
Type: `Boolean`
Default value: `false`

If set to true, the grunt task will abort when it finds a file, which is not allowed for the directory. Otherwise it will just log a warning.

#### targets[i].root
Type: `String`
Default value: `current working directory`

A path that targets[i].directories[j].paths will be added to.

#### targets[i].rules[j].filters
Type: `String`
Default value: `[]`

An array of allowed file types. By default no file types allowed.

#### targets[i].directories[j].paths
Type: `String`
Default value: `[]`

An array of paths to guard. All paths evaluate regarding targets[i].root path.

### Usage Examples

#### Example 1
Checking that:

* 'routers' directory and its subdirectories only contain .js files
* 'public/js' directory and its subdirectories only contain .js files
* 'tests' directory and its subdirectories only contain .js and .json files
* 'public/css' directory only contains .css files
* 'pulbic/css/map' directory only contains .map files

```js
grunt.initConfig({
    dirstruct_guardian: {
        options: {
            fail: true
        },
        js: {
            files: [
                { allowed: ['.js'], src: ['routers/**', 'public/js/**'], expand: true },
                { allowed: ['.js', '.json'], src: ['tests/**'], expand: true }
            ]
        },
        css: {
            files: [
                { allowed: ['.css'], src: ['public/css/*'], expand: true },
                { allowed: ['.map'], src: ['public/css/map/*'], expand: true }
            ]
        }
    }
});
```

Find [here](http://gruntjs.com/configuring-tasks#files) extensive documentation on how to build extended file matchers that fit your needs.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2014-01-08   v0.1.0   Initial release

## License
MIT © [eluck](http://github.com/eluck)