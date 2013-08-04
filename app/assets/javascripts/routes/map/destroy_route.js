var MapModel = require('../../models/map');

var MapDestroyRoute = Ember.Route.extend({
  activate: function(){
    var map = this.controllerFor('map').get('content');
    if(!Ember.isEmpty(map)){
      map.deleteRecord();
      map.get("transaction").commit();
    }
    this.transitionTo('maps');
  }
});

module.exports = MapDestroyRoute;