var CurrentMap = require('../../mixins/current_map');

var MapDestroyRoute = Ember.Route.extend(CurrentMap, {
  activate: function(){
    var map = this.controllerFor('map').get('content');
    if(!Ember.isEmpty(map)){
      map.deleteRecord();
      map.get("transaction").commit();
    }
    this.transitionToCurrentMap();
  }
});

module.exports = MapDestroyRoute;