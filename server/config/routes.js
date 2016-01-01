'use strict';
var auth = require('./auth'),
    mongoose = require('mongoose'),
    //TODO: next line doesn't need to be there, right? try commenting out
    User = mongoose.model('User'),
    users = require('../controllers/users'),
    products = require('../controllers/products');
    //courses = require('../controllers/courses');

module.exports = function(app) {

  //users
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);
  app.get('/api/users/:id', users.getUserById);
  app.delete('/api/users/:id', auth.requiresRole('admin'), users.deleteUser);

  //TODO: delete these...
  //courses
  //app.get('/api/courses', courses.getCourses);
  //app.get('/api/courses/:id', courses.getCourseById);

  //screens
  //products
  app.get('/api/products', products.getProducts);
  app.post('/api/products', auth.requiresRole('admin'), products.createProduct);
  app.put('/api/products', auth.requiresRole('admin'), products.updateProduct);
  app.get('/api/products/:id', products.getProductById);
  app.delete('/api/products/:id', auth.requiresRole('admin'), products.deleteProduct);

  //'*' will equal <directory>/<filename>
  app.get('/partials/*', function(req, res) {
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
