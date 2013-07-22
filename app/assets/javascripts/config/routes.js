var App = require('./app');

App.Router.map(function() {
  this.resource('maps', function(){
    this.resource('map', { path: '/:map_id' }, function(){
      this.route('add');
    });
  });
});
