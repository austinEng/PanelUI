module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        plugins: ['transform-react-jsx'],
        presets: ['es2015', 'react']
      },
      jsx: {
        files: [{
          expand: true,
          cwd: 'src/jsx', // Custom folder
          src: ['*.jsx'],
          dest: 'src/components', // Custom folder
          ext: '.js'
        }]
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/panelui.js': 'src/panelui.js'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/panelui.min.js': 'src/panelui.js'
        }
      }
    },
    sass: {
      dist: {
        files: {
          'dist/panelui.css': 'src/panelui.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['browserify', 'uglify'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: ['src/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      components: {
        files: ['src/jsx/**/*.jsx'],
        tasks: ['babel', 'browserify', 'uglify'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['babel', 'browserify', 'uglify', 'sass']);
}