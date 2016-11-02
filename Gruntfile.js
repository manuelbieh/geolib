/*global module:false*/
module.exports = function(grunt) {

	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt);

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
			},
			pointInside: {
				files: [{
					src: ['src/geolib.isPointInsideRobust.js'],
					dest: 'dist/geolib.isPointInsideRobust.js'
				}]
			},
		},
		replace: {
			version: {
				src: ['dist/*.js', 'bower.json', 'README.md'],
				overwrite: true,
				replacements: [
					{
						from: '$version$',
						to: '<%= pkg.version %>'
					}, {
						from: /"version": "([0-9a-zA-Z\-\.\+]*)",/,
						to: '"version": "<%= pkg.version %>",'
					}, {
						from: /v[0-9]+\.[0-9]{1,2}\.[0-9]{1,}/,
						to: 'v<%= pkg.version %>'
					}
				]
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
			},
			pointInside: {
				files: {
					'dist/geolib.isPointInsideRobust.min.js': ['dist/geolib.isPointInsideRobust.js']
				}
			},
		},
		watch: {
			all: {
				files: '<%= jshint.all %>',
				tasks: ['default']
			}
		},
		jshint: {
			all: [
				'src/geolib.js',
				'src/geolib.elevation.js',
				'src/geolib.isPointInsideRobust.js',
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
				evil: true,
				boss: true,
				eqnull: true,
				globals: {
					module: true,
					define: true,
					require: true,
					elevationResult: true
				}
			}
		}
	});

	// Default task.
	grunt.registerTask('default', ['concat:main', 'copy', 'replace', 'uglify']);
	grunt.registerTask('travis', ['jshint','qunit']);
	grunt.registerTask('test', ['qunit']);

};
