var MapModel = require('../../models/map');

var MapDestroyRoute = Ember.Route.extend({
  enter: function(){
    var map = this.controllerFor('map').get('content');
    if(map){
      map.deleteRecord();
      map.get("transaction").commit();
    }
    this.transitionTo('maps.index');
  }
});

module.exports = MapDestroyRoute;