var App = require('./app');

App.Router.map(function() {
  this.resource('maps', function() {
    this.resource('map');
  });
});

