module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      task : {
        files: {
         "temp/less/temp.css" : "project/src/less/**/*.less"
       }
      }
    },
    concat: {
      options: {
          separator: ' '
      },
      js : {
        src: ['project/src/js/**/*.js'],
        dest: 'debug/js/script_<%= pkg.version %>.min.js'
      },

      lib_js : {
        src: ['project/lib/**/*.js'],
        dest: 'debug/lib/js/lib_<%= pkg.version %>.min.js'
      },

      css : {
        src: ["project/src/css/*.css","temp/less/**/*.css","temp/css/*.css"],
        dest: "debug/css/style_<%= pkg.version %>.min.css"
      },

      lib_css : {
        src: ["project/lib/**/*.css"],
        dest: "debug/lib/css/lib_<%= pkg.version %>.min.css"
      }
    },
    dataUri: {
      dist: {
        // src file
        src: ['project/src/img/embedded.css'],
        // output dir
        dest: "temp/css/",
        options: {
          // specified files are only encoding
        target: ['project/src/img/embed/*.*'],
          // adjust relative path?
        fixDirLevel: true
          // img detecting base dir
          // baseDir: './'
        }
      }
    },

    // jade: {
    //   compile: {
    //     options: {
    //       data: {
    //         debug: false
    //       }
    //     },
    //     files: [
    //       { expand: true, cwd: 'project/src/jade/pages', dest: 'site', src: '**/*.jade', ext: '.html' },
    //       { expand: true, cwd: 'project/src/jade/pages', dest: 'debug', src: '**/*.jade', ext: '.html' }
    //     ]
    //   }
    // },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      site: {
        files: {
          'site/js/script_<%= pkg.version %>.min.js': ['debug/js/script_<%= pkg.version %>.min.js'],
          'site/lib/js/lib_<%= pkg.version %>.min.js': ['debug/lib/js/lib_<%= pkg.version %>.min.js']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'project/src/js/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd : 'debug/css/',
        src: ['*.css'],
        dest: 'site/css/'
      },
      minify_lib: {
        expand: true,
        cwd : 'debug/lib/css/',
        src: ['*.css'],
        dest: 'site/lib/css/'
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 version', '> 1%', 'ie 8']
        },
        files: {
          'debug/css/style_<%= pkg.version %>.min.css': ['debug/css/style_<%= pkg.version %>.min.css']
        }
      }
    },

    copy: {
      img: {
        files: [
          {expand: true, cwd: 'project/src/img/',src: ['**/*.png','**/*.jpeg','**/*.jpg','**/*.gif'], dest: 'site/img'},
          {expand: true, cwd: 'project/src/img/', src: ['**/*.png','**/*.jpeg','**/*.jpg','**/*.gif'], dest: 'debug/img'}
        ]
      },
      lib: {
        files: [
          {expand: true, cwd: 'project/lib/to_copy', src: ['**/*.*'], dest: 'debug/lib'},
          {expand: true, cwd: 'project/lib/to_copy', src: ['**/*.*'], dest: 'site/lib'}
        ]
      },
      others: {
        files: [
          {expand: true, cwd: 'project/src/to_copy', src: ['**/*.*'], dest: 'debug/'},
          {expand: true, cwd: 'project/src/to_copy', src: ['**/*.*'], dest: 'site/'}
        ]
      }
    },

    clean: ["debug/", "site/","temp/"],

    watch: {
      files: ['project/**/*'],
      tasks:  ['debug']
    },

    exec:{
      server: {
        cmd: "node app.js"
      }
    },

    concurrent: {
      debug: {
            tasks: ['exec', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }

    },

    replace: {
      site: {
        options: {
          variables: {
            'version': '<%= pkg.version %>'
          },
          prefix: '@@'
        },
        files: [
          {expand: true, src: ['debug/**/*.html']},
          {expand: true, src: ['site/**/*.html']}
        ]
      }
    },

  zip : {
   site: {
      // Files to zip together
      src: ['site/**/*.*'],

      // Destination of zip file
      dest: 'site.zip'
    }

  }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-data-uri');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-zip');


  grunt.registerTask('default', ['clean', 'jade','jshint', 'dataUri', 'less', 'concat', 'autoprefixer', 'uglify', 'cssmin','copy:lib', 'copy:img', 'copy:others', 'replace', 'zip']);
  grunt.registerTask('debug', ['clean', 'jade','jshint', 'dataUri', 'less', 'concat', 'autoprefixer','copy:lib', 'copy:img', 'copy:others', 'replace']);
  grunt.registerTask('server', ['debug','concurrent:debug']);
};