/*global module:false*/
module.exports = function(grunt) {

	require('time-grunt')(grunt);

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-text-replace');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> <%= pkg.version %> by <%= pkg.author.name %>\n'+
		'* Library to provide geo functions like distance calculation,\n' +
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
			main: {
				options: {
					banner: '<%= banner %>',
					report: false
				},
				src: ['src/geolib.js'],
				dest: 'dist/geolib.js'
			}
		},
		copy: {
			component: {
				files: [{
					src: "package.json",
					dest: "component.json"
				}]
			},
			elev: {
				files: [{
					src: ['src/geolib.elevation.js'],
					dest: 'dist/geolib.elevation.js'
				}]
			}
		},
		replace: {
			version: {
				src: ['dist/*.js', 'bower.json'],
				overwrite: true,
				replacements: [{
					from: '$version$',
					to: '<%= pkg.version %>'
				}, {
					from: /"version": "([0-9a-zA-Z\-\.]*)",/,
					to: '"version": "<%= pkg.version %>",'
				}]
			}
		},
		uglify: {
			options: {
				preserveComments: 'some'
			},
			main: {
				files: {
					'dist/geolib.min.js': ['dist/geolib.js']
				}
			},
			elev: {
				files: {
					'dist/geolib.elevation.min.js': ['dist/geolib.elevation.js']
				}
			}
		},
		watch: {
			files: '<%= jshin.all %>',
			tasks: 'default'
		},
		jshint: {
			all: [
				'src/geolib.js',
				'src/geolib.elevation.js'
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
	grunt.registerTask('default', ['concat:main', 'copy', 'replace', 'uglify']);

	grunt.registerTask('travis', ['jshint','qunit']);
	grunt.registerTask('test', ['qunit']);

};
