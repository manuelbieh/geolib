// package metadata file for Meteor.js
'use strict';

var packageName = 'outatime:geolib';  // https://atmospherejs.com/outatime/geolib

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: 'Geolib - Library to perform geo specific tasks',
  version: packageJson.version,
  documentation: 'meteor/README.md',
  git: 'https://github.com/manuelbieh/geolib.git'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
  api.export('geolib');
  api.addFiles([
    'dist/geolib.js',
    'meteor/export.js'
  ]);
});

Package.onTest(function (api) {
  api.use(packageName);
  api.use('tinytest');

  api.addFiles('meteor/test.js');
});
