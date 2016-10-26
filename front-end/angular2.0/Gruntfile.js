module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      general: {
        options: {
          paths: ['project/src/css/**/*.less']
        },
        files: {
          'temp/css/style.css': 'project/src/css/**/*.less'
        }
      }
    },
    concat: {
      options: {
        separator: ';\n'
      },
      js: {
        src: ['project/lib/**/*.js', 'src/js/*.js'],
        dest: 'debug/js/script.js'
      },
      css: {
        src: ['project/lib/**/*.css', 'temp/css/*.css'],
        dest: 'debug/css/style.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      release: {
        src: ['debug/**/*.js'],
        dest: 'release/js/script.js'
      }
    },
    clean: {
      temp: ['temp'],
      debug: ['debug'],
      release: ['release']
    },
    copy: {
      main: {
        
        files: [
          {expand: true, cwd: 'project/src/', src: ['index.html'], dest: 'debug/', filter: 'isFile'}
        ]
      },
      img: {
        files: [
          {expand: true, cwd: 'project/src/', src: ['img/*'], dest: 'debug/img/'}
        ]
      },
      release: {
        files: [
          {expand: true, cwd: 'debug', src: ['./**/*'], dest: 'release'}
        ]
      }

    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'project/src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'debug/css',
          ext: '.min.css'
        }]
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'debug/**/*.js']
    }
    



  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-concurrent');


  grunt.registerTask('default', ['clean','jshint', 'less', 'concat', 'cssmin','copy:main', 'copy:img', 'copy:release', 'uglify']);
  grunt.registerTask('debug', ['clean','jshint', 'less', 'concat', 'cssmin','copy:main', 'copy:img']);
  // grunt.registerTask('server', ['debug','concurrent:debug']);
};    