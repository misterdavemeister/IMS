'use strict';
var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    productModel = require('../models/Product'),
    locationModel = require('../models/Location');
    //courseModel = require('../models/Course');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log(new Date() + ': ...ims db opened...');
  });

  userModel.createDefaultUsers();
  productModel.createDefaultProducts();
  locationModel.createDefaultLocation();

  //courseModel.createDefaultCourses();

};
