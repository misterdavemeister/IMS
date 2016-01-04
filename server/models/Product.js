var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: {type:String, required:'{PATH} is required!', unique: true},
  description: {type:String, required:'{PATH} is required!'},
  upc: {type:Number, required:'{PATH} is required!', unique: true},
  product_id: {type:Number, required:'{PATH} is required!', unique: true},
  quantity: {type:Number, default:0},
  price: {type:Number, required:'{PATH} is required!'},
  manufacturer: {type:String, required:'{PATH} is required!'},
  alarm: {type:Boolean, default: false},
  alarm_at: {type:Number, default: 1000},
  locations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}],
  allotted: {type:Number, default: 0},
  test: Number
});

var Product = mongoose.model('Product', productSchema);

function createDefaultProducts(next) {
  var count = 0;
  Product.find({}).exec(function(err, collection) {
    if (err) {console.log(err.toString());}
    if (collection.length === 0) {
        Product.create({name: "Azithromycin", description: "aliquam", upc: 144892335, product_id: 100001, quantity: 2883, price: 31.66, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Cialis", description: "non sapien molestie orci tincidunt adipiscing. Mauris", upc: 157385776, product_id: 100002, quantity: 7426, price: 33.33, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Doxycycline Hyclate", description: "eu", upc: 178114430, product_id: 100003, quantity: 6741, price: 33.33, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Allopurinol", description: "diam.", upc: 164116951, product_id: 100004, quantity: 3388, price: 0.94, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Citalopram HBR", description: "semper tellus id nunc interdum feugiat. Sed nec", upc: 188541839, product_id: 100005, quantity: 2494, price: 66.46, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Fluticasone Propionate", description: "ipsum primis in faucibus orci luctus", upc: 109269138, product_id: 100006, quantity: 6866, price: 80.15, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Prednisone", description: "tincidunt aliquam arcu. Aliquam ultrices", upc: 194059602, product_id: 100007, quantity: 4105, price: 71.71, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Nasonex", description: "cursus", upc: 125855610, product_id: 100008, quantity: 6222, price: 79.66, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Methylprednisolone", description: "egestas, urna justo faucibus lectus, a", upc: 180311855, product_id: 100009, quantity: 199, price: 68.88, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Lovaza", description: "turpis egestas.", upc: 160846374, product_id: 100010, quantity: 910, price: 66.06, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Diazepam", description: "Duis at lacus. Quisque purus sapien,", upc: 130208003, product_id: 100011, quantity: 6806, price: 77.57, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Digoxin", description: "sed consequat auctor, nunc nulla", upc: 111149613, product_id: 100012, quantity: 4000, price: 84.52, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Vyvanse", description: "erat vel pede blandit congue. In scelerisque", upc: 173872768, product_id: 100013, quantity: 8616, price: 84.88, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Hydrochlorothiazide", description: "Sed nulla ante, iaculis nec, eleifend non, dapibus", upc: 165333639, product_id: 100014, quantity: 1219, price: 46.84, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Lovastatin", description: "et, magna. Praesent interdum ligula eu enim.", upc: 190352456, product_id: 100015, quantity: 7149, price: 73.97, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Crestor", description: "libero. Proin mi. Aliquam gravida mauris", upc: 171917888, product_id: 100016, quantity: 1076, price: 43.36, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Suboxone", description: "mollis. Duis sit", upc: 123218617, product_id: 100017, quantity: 8873, price: 61.32, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Oxycontin", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing", upc: 173278710, product_id: 100018, quantity: 4168, price: 47.00, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Amlodipine Besylate", description: "erat eget ipsum. Suspendisse", upc: 180690494, product_id: 100019, quantity: 7485, price: 74.74, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Cyclobenzaprin HCl", description: "egestas rhoncus. Proin nisl sem, consequat nec, mollis vitae,", upc: 162946418, product_id: 100020, quantity: 8797, price: 69.65, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Potassium Chloride", description: "sed orci lobortis augue scelerisque mollis. Phasellus libero mauris,", upc: 153030350, product_id: 100021, quantity: 1524, price: 59.06, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Nuvaring", description: "turpis. Aliquam adipiscing", upc: 174383816, product_id: 100022, quantity: 8847, price: 23.46, manufacturer: "Velit Ltd"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Lantus Solostar", description: "Sed molestie. Sed id risus quis diam luctus lobortis.", upc: 167778329, product_id: 100023, quantity: 9799, price: 85.34, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Zolpidem Tartrate", description: "nunc sed libero. Proin sed", upc: 135695597, product_id: 100024, quantity: 6829, price: 65.02, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Alprazolam", description: "non, hendrerit", upc: 157236172, product_id: 100025, quantity: 7114, price: 86.63, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Benicar HCT", description: "ac risus. Morbi metus. Vivamus", upc: 151683588, product_id: 100026, quantity: 2287, price: 31.25, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Flovent HFA", description: "rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede", upc: 114820801, product_id: 100027, quantity: 6775, price: 53.57, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Carvedilol", description: "fringilla", upc: 188269450, product_id: 100028, quantity: 5938, price: 2.28, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Zetia", description: "ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor,", upc: 149877816, product_id: 100029, quantity: 5157, price: 7.50, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Promethazine HCl", description: "magna tellus faucibus leo, in lobortis tellus justo", upc: 199667777, product_id: 100030, quantity: 1499, price: 83.82, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Sulfamethoxazole/Trimethoprim", description: "at,", upc: 101348657, product_id: 100031, quantity: 9321, price: 75.81, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Metformin HCl", description: "turpis nec mauris blandit mattis. Cras eget nisi", upc: 123358964, product_id: 100032, quantity: 1475, price: 8.46, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Carisoprodol", description: "nonummy. Fusce fermentum", upc: 110378708, product_id: 100033, quantity: 3280, price: 80.24, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Oxycodone HCl", description: "lectus. Sociis natoque penatibus et magnis dis parturient montes,", upc: 141899559, product_id: 100034, quantity: 1475, price: 99.21, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Triamcinolone Acetonide", description: "libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus", upc: 176326475, product_id: 100035, quantity: 5622, price: 78.13, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Amoxicillin Trihydrate/Potassium Clavulanate", description: "pretium et, rutrum non, hendrerit", upc: 172118722, product_id: 100036, quantity: 3005, price: 95.29, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Enalapril Maleate", description: "arcu. Vestibulum", upc: 189161180, product_id: 100037, quantity: 4015, price: 95.02, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Famotidine", description: "Aenean massa. Integer vitae nibh.", upc: 179448693, product_id: 100038, quantity: 3238, price: 1.78, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Cymbalta", description: "et tristique pellentesque,", upc: 183852722, product_id: 100039, quantity: 6414, price: 84.25, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Levothyroxine Sodium", description: "enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin", upc: 178440809, product_id: 100040, quantity: 6583, price: 54.67, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Lorazepam", description: "hendrerit. Donec porttitor tellus non magna.", upc: 149345771, product_id: 100041, quantity: 3763, price: 20.00, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Amoxicillin", description: "ultrices a, auctor", upc: 114235749, product_id: 100042, quantity: 1267, price: 54.32, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Ventolin HFA", description: "arcu. Sed eu", upc: 183718248, product_id: 100043, quantity: 9720, price: 67.79, manufacturer: "Arcu Sed LLC"}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Tramadol HCl", description: "nulla. Integer urna. Vivamus molestie dapibus", upc: 183170073, product_id: 100044, quantity: 9964, price: 25.87, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Niaspan", description: "ultrices. Duis volutpat", upc: 163398937, product_id: 100045, quantity: 318, price: 42.19, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Benicar", description: "tempus, lorem fringilla ornare", upc: 179124165, product_id: 100046, quantity: 2074, price: 4.01, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Levaquin", description: "sed pede.", upc: 141465064, product_id: 100047, quantity: 1749, price: 84.85, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Atenolol", description: "scelerisque sed, sapien.", upc: 191138357, product_id: 100048, quantity: 2272, price: 43.18, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Lidoderm", description: "auctor ullamcorper,", upc: 167295296, product_id: 100049, quantity: 2601, price: 67.34, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Gabapentin", description: "vel sapien", upc: 166252915, product_id: 100050, quantity: 2224, price: 85.51, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Metoprolol Succinatee", description: "eu dui.", upc: 129095336, product_id: 100051, quantity: 2867, price: 93.57, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Cheratussin AC", description: "vitae erat vel pede blandit congue. In scelerisque", upc: 121192516, product_id: 100052, quantity: 3351, price: 62.20, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Hydrocodone/APAP", description: "natoque", upc: 159710182, product_id: 100053, quantity: 9526, price: 75.87, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Januvia", description: "Mauris", upc: 141628156, product_id: 100054, quantity: 4337, price: 53.59, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Lipitor", description: "dignissim lacus.", upc: 184796433, product_id: 100055, quantity: 2090, price: 99.98, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Gianvi", description: "tellus justo sit", upc: 168548689, product_id: 100056, quantity: 8358, price: 63.52, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Klor-Con M20", description: "mollis. Duis sit amet", upc: 132580525, product_id: 100057, quantity: 9662, price: 35.35, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Proair HFA", description: "convallis erat, eget tincidunt dui", upc: 186940630, product_id: 100058, quantity: 221, price: 68.28, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Losartan Potassium", description: "orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras", upc: 135569411, product_id: 100059, quantity: 9757, price: 5.16, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Lisinopril", description: "dignissim tempor arcu. Vestibulum ut eros", upc: 107756496, product_id: 100060, quantity: 1115, price: 28.78, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Ciprofloxacin HCl", description: "diam eu dolor egestas rhoncus. Proin nisl sem,", upc: 120976470, product_id: 100061, quantity: 5253, price: 93.63, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "TriNessa", description: "dolor, tempus non, lacinia", upc: 115105721, product_id: 100062, quantity: 2982, price: 42.99, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Triamterene/Hydrochlorothiazide", description: "sit amet, dapibus id, blandit at, nisi.", upc: 141914097, product_id: 100063, quantity: 3800, price: 29.79, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
        Product.create({name: "Clonazepam", description: "adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras interdum.", upc: 159873054, product_id: 100064, quantity: 5079, price: 61.28, manufacturer: "Iaculis Inc."}, function(err) {
          if (err) console.log(err.toString());
          count++;
          if (count === 64) {
            next();
          }
        });
    }
  });
}

function populateProducts() {
  var Location = mongoose.model('Location');
  function populate(string) {
    if (string === 'products') {
      Location.findOne({name: 'Warehouse 1'})
              .populate('products')
              .exec(function(err, location) {
          console.log("location is: " + location);
        })
    } else {
      Product.findOne({product_id:100001})
             .populate('locations')
             .exec(function(err, product) {
          console.log("product is: " + product);
        })
      }
  }
  Product.findOne({product_id: 100001}, function(err, product) {
    if (err) {
      console.log(err.toString());
//      next(err);
    }
    Location.findOne({name:'Warehouse 1'}, function(err, location) {
      if (err) {
        console.log(err.toString());
      }
      product.locations.push(location._id);
      location.products.push(product._id);
      console.log('populated product.locations');
      console.log('populated location.products');
      product.save(function(err) {
        if (err) {
          console.log(err.toString());
        } else {
          populate('locations');
        }
      });
      location.save(function(err) {
        if (err) {
          console.log(err.toString());
        } else {
          populate('products');
        }
      });
    });
  });
}

exports.createDefaultProducts = createDefaultProducts;
exports.populateProducts = populateProducts;