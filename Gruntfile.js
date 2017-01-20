module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['public/**/*.js',
        'Gruntfile.js',
        'app/**/*.js',
        'lib/**/*.js',
        'spec/**/*.js',
        './*.js']
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/built.js',
      },
    },

    uglify: {
      dist: {
        files: {
          'public/dist/built.min.js': ['public/dist/built.js']
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'public/dist/style.min.css': ['public/style.css']
        }
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

    shell: {
      prodServer: {
        command: 'git push live master',
        options: {
          failOnError: true
        }
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

  grunt.registerTask('test', ['eslint', 'mochaTest']);

  grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['shell:prodServer']);
    } else {
      grunt.task.run(['server-dev']);
    }
  });

  grunt.registerTask('deploy', ['test', 'build', 'upload']);

};
