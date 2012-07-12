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
      files: ['geolib.js']
    },
    test: {
      files: ['tests/*.js']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:<%= pkg.name %>.js>'],
        dest: '<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
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
  grunt.registerTask('default', 'lint concat min');

};
