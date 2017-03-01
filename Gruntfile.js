module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8008,
                    hostname: 'localhost',
                    livereload: true
                }
            }
        },
        uglify: {
            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['build/js/index.js']
                }
            }
        },
        cssmin: {
            foo: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css]'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            },
            poo: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css]'],
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'build/scss',
                    src: ['*.scss'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },
        htmlmin: {
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': './index.html', // 'destination': 'source'
                }
            }
        },
        watch: {
            client: {
                files: ['index.html', 'css/**/*.css'],
                options: {
                    livereload: true
                }
            },
            // script: {
            //     files: ['build/js/index.js'],
            //     tasks: ['uglify'],
            //     options: {
            //         spawn: false,
            //     }
            // },
            // css:{
            //     files:['build/scss/style.scss'],
            //     tasks:['sass'],
            //     options:{
            //       reload: true,
            //     }
            // },
            // foo: {
            //     files: ['dist/css/style.css'],
            //     tasks: ['cssmin:foo'],
            //     options: {
            //         spawn: false,
            //     }
            // },

        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('ug', ['uglify']);
    grunt.registerTask('cs', ['cssmin']);
    grunt.registerTask('sa',['sass']);
    grunt.registerTask('htmlmin', ['htmlmin']);

};

//------------------------------------------