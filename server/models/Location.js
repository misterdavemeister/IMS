var mongoose = require('mongoose'),
    loadModel = require('../models/Load'),
    loadSchema = loadModel.loadSchema;

var locationSchema = mongoose.Schema({
  name: String,
  location_id: Number,
  address: String,
  loads: [loadSchema]
});

var Location = mongoose.model('Location', locationSchema);

function createDefaultLocation() {
  Location.find({}).exec(function(err, collection) {
    if (err) {console.log(err.toString());}
    if (collection.length === 0) {
      Location.create({
        name: "Warehouse 1",
        location_id: 100001,
        address: "123 Warehouse Rd"
      });
    }
  });
}

exports.createDefaultLocation = createDefaultLocation;
