var auth = require('./auth'),
    mongoose = require('mongoose'),
    users = require('../controllers/users'),
    products = require('../controllers/products'),
    locations = require('../controllers/locations'),
    inboundOrders = require('../controllers/inboundOrders'),
    outboundOrders = require('../controllers/outboundOrders'),
    loads = require('../controllers/loads');

module.exports = function(app) {

  //users
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', auth.requiresRole('admin'), users.createUser);
  app.put('/api/users', auth.requiresApiLogin, users.updateUser);
  app.get('/api/users/:id', auth.requiresRole('admin'), users.getUserById);
  app.delete('/api/users/:id', auth.requiresRole('admin'), users.deleteUser);

  //loads
  app.get('/api/loads', loads.getLoads);
  app.post('/api/loads/', auth.requiresApiLogin, loads.createLoad);

  //*** screens ***//
  //inbound
  app.get('/api/orders', inboundOrders.getInboundOrders);
  app.post('/api/orders', auth.requiresApiLogin, inboundOrders.createInboundOrder);
  app.put('/api/orders', auth.requiresRole('admin'), inboundOrders.updateInboundOrder);
  app.get('/api/orders/:id', inboundOrders.getOrderById);
  app.delete('/api/orders/:id', auth.requiresRole('admin'), inboundOrders.deleteInboundOrder);

  //outbound
  app.get('/api/sales', outboundOrders.getOutboundOrders);
//  app.post('/api/sales', auth.requiresApiLogin, outboundOrders.createOutboundOrder);
//  app.put('/api/sales', auth.requiresRole('admin'), outboundOrders.updateOutboundOrder);
  app.get('/api/sales/:id', outboundOrders.getOrderById);
//  app.delete('/api/sales/:id', auth.requiresRole('admin'), outboundOrders.deleteOutboundOrder);

  //products
  app.get('/api/products', products.getProducts);
  app.post('/api/products', auth.requiresRole('admin'), products.createProduct);
  app.put('/api/products', auth.requiresRole('admin'), products.updateProduct);
  app.get('/api/products/:id', products.getProductById);
  app.delete('/api/products/:id', auth.requiresRole('admin'), products.deleteProduct);

  //locations
  app.get('/api/locations', locations.getLocations);

  //*** end screens ***//

  //'*' will equal <directory>/<filename>
  app.get('/partials/*', function(req, res) {
    console.log('req.params[0]');
    console.log(req.params[0]);
    console.log(req.params);
    console.log(req.params);
    res.render('../../public/app/' + req.params[0])
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.send();
  });

  //catch-all for invalid api url
  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  //everything else redirects to home page
  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};
