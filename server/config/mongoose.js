var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    locationModel = require('../models/Location'),
    inboundOrderModel = require('../models/InboundOrder'),
    productModel = require('../models/Product');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log(new Date() + ': ...ims db opened...');
  });

  userModel.createDefaultUsers();
  locationModel.createDefaultLocation();
//  inboundOrderModel.createDefaultInboundOrders();
  productModel.createDefaultProducts(productModel.populateProducts);
};
