/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-jslint');

  var fs = require('fs');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> <%= pkg.version %> by <%= pkg.author.name %>\n'+
		'* A growing library to provide some basic geo functions like distance calculation,\n' +
        '* conversion of decimal coordinates to sexagesimal and vice versa, etc.\n' +
        '* WGS 84 (World Geodetic System 1984)\n' +
        '* \n' + 
        '* @author <%= pkg.author.name %>\n' + 
        '* @url <%= pkg.author.url %>\n' + 
        '* @version <%= pkg.version %>\n' +
        '* @license <%= _.pluck(pkg.licenses, "type").join(", ") %> \n**/'
    },
    lint: {
      files: ['src/geolib.js']
    },
    qunit: {
      files: ['tests/*.html']
    },
    clean: {
      component: [
        "component.json"
      ]
    },
    copy: {
      component: {
        files: {
          "component.json": "package.json"
        }
      }
    },
    concat: {
      full: {
        src: ['<banner:meta.banner>', 'src/geolib.js'],
        dest: 'geolib.js'
      },
    /*
      noelevation: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: '<%= pkg.name %>.js'
      }
    */
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
		}
	},
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.full.dest>'],
        dest: '<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
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
        eqnull: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Default task.
  //grunt.registerTask('default', 'lint test concat min');
  //grunt.registerTask('default', 'lint qunit clean concat:full min copy');
  grunt.registerTask('default', ['clean', 'concat', 'replace:full','copy']);
  grunt.registerTask('travis', ['lint','qunit']);
  grunt.registerTask('test', ['qunit']);
  //grunt.registerTask('no-elevation', 'lint qunit concat:noelevation min');
  grunt.registerTask('no-elevation', ['concat', 'replace:noelevation']);

};
