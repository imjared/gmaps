/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: '<json:package.json>',

    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
        '*/'
    },

    lint: {
      files: ['grunt.js']
    },

    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'scripts/source/*.js'
        ],
        dest: 'scripts/all-scripts.js'
      }
    },

    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'scripts/all-scripts.min.js'
      }
    },

    compass: {
      dev: {
        src: 'sass',
        dest: 'stylesheets',
        linecomments: true,
        forcecompile: true,
        relativeassets: true,
        images: 'assets/images',
        require: [
          'susy'
        ]
      },
      prod: {
        src: 'sass',
        dest: 'stylesheets',
        linecomments: false,
        forcecompile: true,
        outputstyle: 'compressed',
        relativeassets: true,
        images: 'assets/images',
        require: [
          'susy'
        ]
      }
    },
    watch: {
        scripts: {
            files: ['scripts/source/*.js'],
            options: {
                livereload: true
            }
        },
        html: {
            files:['index.html', 'stylesheets/*.css'],
            options: {
                livereload: true
            }
        },
        compass: {
            files:['sass/*.scss', 'sass/*/*.scss'],
            tasks: [ 'compass:dev' ]
        }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        jQuery: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['watch']);

  // dependencies
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-compass' );
};
