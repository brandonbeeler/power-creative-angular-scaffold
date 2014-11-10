module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      build: {
        'src': [ 'src/app/app.module.js', 'src/app/app.routes.js', 'src/app/app.controller.js', 'src/app/*/**.js' ],
        'dest' : 'dist/lib/js/build.js'
      },
      
      vendor: {
        'src': ['vendor/*.js'],
        'dest': 'dist/lib/js/vendor/vendor.js'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'src/lib/sass',
          cssDir: 'dist/lib/css'
        }
      }
    },

    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        compress: {
          drop_console: true
        }
      },

      js: {
        src: [ 'dist/lib/js/build.js' ],
        dest: 'dist/lib/js/build.min.js'
      }
    },

    karma: {
      unit: {
        configFile: 'tests/karma.conf.js'
      }
    },

    copy: {
      main: {
        src: 'src/app/*/*.view.html',
        dest: 'dist/views/',
        flatten: true,
        expand: true
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['tests/app/*.js', 'src/app/*/*.js']
    },

    watch: {
      files: ['src/app/*.js', 'src/app/**/*.js', 'src/app/*/*.view.html', 'src/lib/sass/*.scss'],
      tasks: ['concat', 'compass', 'copy', 'uglify']
    }
  });

  // load NpmTasks
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  grunt.registerTask('default', ["concat", "uglify", "compass", "copy", "karma", "watch"]);
};
