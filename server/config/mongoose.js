var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    locationModel = require('../models/Location'),
    productModel = require('../models/Product'),
    inboundOrderModel = require('../models/InboundOrder'),
    outboundOrderModel = require('../models/OutboundOrder'),
    loadModel = require('../models/Load');

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
  productModel.createDefaultProducts();
};
