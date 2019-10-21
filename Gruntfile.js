module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            dev: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    strictImports: true,
                    sourceMap: true,
                    sourceMapFilename: '/css/responsive-styles.css.map', // where file is generated and located
                    sourceMapURL: 'responsive-styles.css.map', // the complete url and filename put in the compiled css file
                    sourceMapBasepath: 'pub', // Sets sourcemap base path, defaults to current working directory.
                    sourceMapRootpath: '/', // adds this path onto the sourcemap filename and less file paths
                },
                files: {
                    "css/style.css": "less/style.less"
                }
            },
            prod: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    strictImports: true
                },
                files: {
                    "css/style.css": "less/style.less"
                }
            }
        },

        postcss: {
            dev: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({
                            overrideBrowserslist: ['last 2 versions',  'ie 11']
                        })
                    ]
                },
                src: 'css/style.css',
                dest: 'css/style.min.css'
            },

            prod: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            overrideBrowserslist: ['last 2 versions',  'ie 11']
                        }),
                        require('cssnano')()
                    ]
                },
                src: 'css/style.css',
                dest: 'css/style.min.css'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'imag/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'pub/img/'
                }]
            }
        },

        watch: {
            less: {
                files: ['less/**/*.less'],
                tasks: ['less:dev', 'postcss:dev']
            },
            css: {
                files: ['css/*.min.css'],
                options: {
                    livereload: true,
                }
            },
            imagemin: {
                files: 'img/**/*.{png,jpg,gif}',
                tasks: ['imagemin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less:prod', 'postcss:prod', 'imagemin']);
    grunt.registerTask('dev', ['less:dev', 'postcss:dev', 'imagemin', 'watch']);
};
