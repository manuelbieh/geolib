/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-text-replace');

  var fs = require('fs');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	banner: '/*! <%= pkg.name %> <%= pkg.version %> by <%= pkg.author.name %>\n'+
	'* A growing library to provide some basic geo functions like distance calculation,\n' +
	'* conversion of decimal coordinates to sexagesimal and vice versa, etc.\n' +
	'* WGS 84 (World Geodetic System 1984)\n' +
	'* \n' + 
	'* @author <%= pkg.author.name %>\n' + 
	'* @url <%= pkg.author.url %>\n' + 
	'* @version <%= pkg.version %>\n' +
	'* @license <%= _.pluck(pkg.licenses, "type").join(", ") %> \n**/',
    lint: {
      files: ['src/geolib.js']
    },
    qunit: {
      files: ['tests/*.html']
    },
	concat: {
		options: {
			banner: '<%= banner %>',
			report: false
		},
		full: {
			src: ['src/geolib.js'],
			dest: 'geolib.js'
		}
	},
    copy: {
      component: {
        files: [{
          src: "package.json",
          dest: "component.json"
        }]
      }
    },
	replace: {
		noelevation: {
			src: 'geolib.js',
			dest: 'geolib.js',
			replacements: [{
				from: '/* %ELEVATION% */',
				to: ''
			}]
		},
		full: {
			src: 'geolib.js',
			dest: 'geolib.js',
			replacements: [{
				from: '/* %ELEVATION% */',
				to: fs.readFileSync('src/geolib.elevation.js', 'utf-8')
			}]
		},
		version: {
			src: 'geolib.js',
			dest: 'geolib.js',
			replacements: [{
				from: '$version$',
				to: '<%= pkg.version %>'
			}]
		}
	},
    uglify: {
      options: {
        banner: "<%= banner %>"
      },
      full: {
        files: {
			'geolib.min.js': ['geolib.js']
        }
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
	  all: [
	    'src/geolib.js'
	  ],
      options: {
        curly: true,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        globals: {
	      module: true,
	      define: true
        }
      }
    }
  });

  // Default task.
  //grunt.registerTask('default', 'lint test concat min');
  //grunt.registerTask('default', 'lint qunit clean concat:full min copy');
 
  grunt.registerTask('default', ['concat:full', 'copy', 'replace:full', 'uglify']);
  grunt.registerTask('travis', ['jshint','qunit']);
  grunt.registerTask('test', ['qunit']);
  //grunt.registerTask('no-elevation', 'lint qunit concat:noelevation min');
  grunt.registerTask('no-elevation', ['concat:full', 'replace:noelevation', 'uglify']);

};
