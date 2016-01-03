var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    locationModel = require('../models/Location'),
    productModel = require('../models/Product');
    //courseModel = require('../models/Course');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log(new Date() + ': ...ims db opened...');
  });

  userModel.createDefaultUsers();
  locationModel.createDefaultLocation();
  productModel.createDefaultProducts();

  locationModel.populateProducts();
  productModel.populateLocations();
  //courseModel.createDefaultCourses();

};
