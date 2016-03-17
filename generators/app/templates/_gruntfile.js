module.exports = function(grunt) {
    grunt.initConfig({
        //tasks in here in object notation
        less: {
            dev: {
                options: {
                    compress: false,
                    sourceMap: true,
                    dumpLineNumbers: 'comments',
                    plugins: [
                        new(require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] })
                    ],
                },
                files: {
                    "css/<%= name %>_custom.css": "css/less/<%= name %>_custom.less",
                }
            },
            dist: {
                options: {
                    compress: true,
                    sourceMap: false,
                    plugins: [
                        new(require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] })
                    ],
                },
                files: {
                    "css/<%= name %>_custom.css": "css/less/<%= name %>_custom.less",
                }
            },
        },
        jshint: {
            all: ['js/**/*.js']
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['index.html']
                }
            }
        },
        watch: {
            html: {
                files: ['*.html'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: ['css/less/**/*.less'],
                tasks: ['less:dev'],
                options: {
                    livereload: true,
                }
            },
            scripts: {
                files: ['javascript/<%= name %>_custom.js'],
                tasks: ['jshint'],
                options: {
                    event: ['all'],
                    // livereload: true,
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['less:dev']);
    grunt.registerTask('live', ['less:dist', 'processhtml']);
};
