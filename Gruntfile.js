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
          cwd: 'src/jsx',
          src: ['*.jsx'],
          dest: 'src/components',
          ext: '.js'
        }]
      }
    },
    browserify: {
      dist: {
        files: {
          'example/example.js': 'src/example.js'
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
        files: ['src/example.js'],
        tasks: ['browserify'],
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
        tasks: ['babel', 'browserify'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['babel', 'browserify', 'sass']);
}