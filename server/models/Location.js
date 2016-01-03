var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  name: String,
  location_id: Number,
  products: [{type: Number, ref: 'Product'}]
});

var Location = mongoose.model('Location', locationSchema);

function createDefaultLocation() {
  Location.find({}).exec(function(err, collection) {
    if (err) {console.log(err.toString());}
    if (collection.length === 0) {
      Location.create({name:"Warehouse 1",
        products: [
        100001, 100064, 100033, 100040
      ]}, function(err, location) {
//        location.populate('products');
      });
    }
  });
}

function populateProducts() {
  Location.find({}).exec(function(err, collection) {
    collection.forEach(function(location) {
      location.populate('products');
    });
  });
}

exports.createDefaultLocation = createDefaultLocation;
exports.populateProducts = populateProducts;