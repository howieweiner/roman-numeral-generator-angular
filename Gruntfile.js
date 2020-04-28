'use strict';

module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    protractor_webdriver: {
      start: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    },
    protractor: {
      options: {
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        configFile: "protractor.conf.js"
      },
      run: {}
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/**/*.js'
      ]
    },
    concat: {
      options: {
        sourceMap: true
      }
    },
    copy: {
      index: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },
    uglify: {
      options: {
        mangle: false
      }
    },
    ngAnnotate: {
      options: {},
      app: {
        files: {
          'dist/js/app.js': ['dist/js/app.js']
        }
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
    less: {
      development: {
        options: {
          paths: ["src/assets/less"]
        },
        files: {
          "src/assets/css/app.css": "src/assets/less/theme.less"
        }
      }
    },
    cssmin: {
      app: {
        src: 'src/assets/css/app.css',
        dest: 'dist/assets/css/app.css'
      }
    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      files: {
        src: [
          'dist/js/**/*.js',
          'dist/assets/css**/*.css'
        ]
      }
    },
    clean: {
      dist: ['dist']
    },
    watch: {
      options: {
        atBegin: true,
        livereload: true
      },
      dev: {
        files: ['Gruntfile.js', 'src/*.html', 'src/app/**/*.html', 'src/app/**/*.js',
          'src/assets/less/**/*.less'],
        tasks: ['less']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          host: 'localhost'
        }
      }
    }
  });

  /**
   * Clean the dist folder.
   * Compile the Less files
   * Run an annotation check over the angular code
   * Copy index.html to dist folder
   * Run usemin to replace inline js and css src paths to single files
   *  - compile angular templates into cache as part of usemin
   *  - concat files
   *  - minify css
   *  - uglify js code, but don't mangle as Angular seems to have issues with this.
   *  - and file revisions to new files
   *
   */
  grunt.registerTask('build', [
    'clean',
    'less',
    'copy',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('unit', ['jshint', 'karma:unit']);
  grunt.registerTask('e2e', ['protractor_webdriver:start', 'connect:server', 'protractor:run']);
  grunt.registerTask('dev', ['connect:server', 'watch:dev']);
  grunt.registerTask('test', ['unit', 'e2e']);
  grunt.registerTask('dist', ['test', 'build']);
  grunt.registerTask('default', ['dev']);
};