module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [
                'Gruntfile.js',
                'src/js/models/*.js',
                'src/js/collections/*.js',
                'src/js/views/*.js',
                'src/js/app.js',
                'src/js/namespace.js'
            ]
        },

        // Compassのコンパイル
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        // CSSのminify: expanded, compressed 両ファイルを作るため、compassではminifyしない
        cssmin: {
            minify: {expand: true, src: ['assets/css/style.css'], ext: '.min.css'}
        },

        // テンプレートファイルのプリコンパイル
        handlebars: {
            compile: {
                options: {
                    namespace: 'MyApp.Templates',
                    processName: function (filename) {
                        var pieces = filename.split('/');
                        return pieces[pieces.length - 1].replace(/.hbs$/, '');
                    }
                },
                files: {
                    'src/js/templates/layout.js': 'src/hbs/*.hbs'
                }
            }
        },

        // ファイル結合の設定
        concat: {
            dist: {
                src: [
                    'src/js/namespace.js',
                    'src/js/templates/*.js',
                    'src/js/models/*.js',
                    'src/js/collections/*.js',
                    'src/js/views/*.js',
                    'src/js/app.js'
                ],
                dest: 'assets/js/app.js'
            },
            dev: {
                src: [
                    'src/js/namespace.js',
                    'src/js/templates/*.js',
                    'src/js/models/*.js',
                    'src/js/collections/*.js',
                    'src/js/views/*.js',
                    'src/js/app.js'
                ],
                dest: 'assets/js/app.min.js'
            }
        },

        // ファイル圧縮の設定
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'gzip'
            },
            build: {
                src: 'assets/js/app.js',
                dest: 'assets/js/app.min.js'
            }
        },

        // gzip
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    {expand: true, src: ['assets/js/app.min.js']}
                ]
            }
        },

        watch: {
            files: [
                'src/**',
                '!src/js/templates/layout.js'
            ],
            tasks: ['dev']
        }
    });

    // プラグインのロード
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Distribution
    grunt.registerTask('build', ['jshint', 'compass', 'cssmin', 'handlebars', 'concat', 'uglify', 'compress']);

    // Development
    grunt.registerTask('dev', ['compass', 'cssmin', 'handlebars', 'concat:dev']);
};
