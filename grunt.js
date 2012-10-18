/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/**\n'+
		'* A small library to provide some basic geo functions like distance calculation,\n' +
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
    concat: {
      full: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>', 'src/geolib.elevation.js'],
        dest: '<%= pkg.name %>.js'
      },
      noelevation: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: '<%= pkg.name %>.js'
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
  grunt.registerTask('default', 'lint qunit concat:full min');
  grunt.registerTask('travis', 'lint qunit');
  grunt.registerTask('test', 'qunit');
  grunt.registerTask('no-elevation', 'lint qunit concat:noelevation min');

};
