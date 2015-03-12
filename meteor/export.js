// Geolib makes `geolib` global on the window (or global) object, while Meteor expects a file-scoped global variable
geolib = this.geolib;
delete this.geolib;
