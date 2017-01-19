module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //build grunt actions
    eslint: {
      target: ['public/client/**/*.js']
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'dist/built.js',
      },
    },

    uglify: {
      my_target: {
        files: {
          'dest/output.min.js': ['dist/built.js']
        }
      }
    },

    cssmin: {
      my_target: {
        src: 'public/style.css',
        dest: 'public/style.min.css'
      }
    },

    //test grunt actions
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    //server-dev grunt actions
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },



      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },
    //upload grunt command
    //TODO shell
    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('build', ['eslint', 'test', 'concat']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      ['deploy', 'shell'];
    } else {
      grunt.task.run(['server-dev']);
    }
  });

  grunt.registerTask('deploy', ['build', 'uglify', 'cssmin']);

};
