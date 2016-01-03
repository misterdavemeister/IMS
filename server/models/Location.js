var mongoose = require('mongoose'),
    Product = mongoose.model('Product');

var locationSchema = mongoose.Schema({
  name: String,
  location_id: Number,
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

var Location = mongoose.model('Location', locationSchema);

function createDefaultLocation() {
  Location.find({}).exec(function(err, collection) {
    if (err) {console.log(err.toString());}
    if (collection.length === 0) {
      Location.create({
        name: "Warehouse 1"
      });
    }
  });
}

function populateLocations() {

}

exports.createDefaultLocation = createDefaultLocation;
exports.populateLocations = populateLocations;