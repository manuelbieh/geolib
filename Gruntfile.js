/*global module:false*/
module.exports = function(grunt) {

	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('version', function(target, op) {

		var fs = require('fs');
		var data = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf-8'}));
		var version = data.version.split('.');

		var major = parseInt(version[0], 10);
		var minor = parseInt(version[1], 10);
		var patch = parseInt(version[2].split('+')[0], 10);
		var info = version[2].split('+')[1];
		var log = '';

		if(typeof op == 'undefined' || op === '+') {
			op = '+';
			log += 'Incrementing ';
		} else if(op === '-') {
			op = op;
			log += 'Decrementing ';
		} else if(!isNaN(parseInt(op, 10))) {
			op = parseInt(op, 10);
			log += 'Using ' + op + ' as new ';
		} else {
			grunt.log.fail('Illegal operation.');
			return false;
		}

		if(['major', 'minor', 'patch'].indexOf(target) > -1) {
			log += target + ' version. ';
		}

		switch(target) {
			case 'major':
				major = op == '-' ? major-1 : (op == '+' ? major+1 : op);
				if(major < 0) major = 0;
				break;
			case 'minor':
				minor = op == '-' ? minor-1 : (op == '+' ? minor+1 : op);
				if(minor < 0) minor = 0;
				break;
			case 'patch':
				patch = op == '-' ? patch-1 : (op == '+' ? patch+1 : op);
				if(patch < 0) patch = 0;
				break;
		}

		data.version = [major, minor, patch].join('.') + (info ? '+' + info : '');

		grunt.log.writeln(log + 'New version is ' + data.version);

		fs.writeFileSync('package.json', JSON.stringify(data, null, 2), {encoding: 'utf-8'})
		grunt.config.data.pkg.version = data.version;

		grunt.task.run('default');

	});

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
			}
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
