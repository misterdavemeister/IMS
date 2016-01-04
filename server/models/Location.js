var mongoose = require('mongoose');

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

/*function populateLocations(next) {
  var Product = mongoose.model('Product');
  Location.find({}).exec(function(err, collection) {
    if (err) {console.log(err.toString());}
    if (collection.length > 0) {
      collection.forEach(function(location) {
        Product.findOne({product_id: 100001}, function(err, product) {

          location.products.push(product._id);
          console.log('populated location.products');
          console.log(location);
          location.save(function(err) {
            if (err) {
              console.log(err.toString());
              next(err);
            }
            product.populate('locations').exec(function(err) {
              if (!err) next(null, true);
              else next(err);
            });
          });
        });

      });
    } else {
      console.log("nothing in database for 'location'");
    }
  });
}*/

exports.createDefaultLocation = createDefaultLocation;
//exports.populateLocations = populateLocations;