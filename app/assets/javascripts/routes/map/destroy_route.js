var TransitionMap = require('../../mixins/transition_map');

var MapDestroyRoute = Ember.Route.extend(TransitionMap, {
  activate: function(){
    var map = this.controllerFor('map').get('content');
    if(!Ember.isEmpty(map)){
      map.deleteRecord();
      map.get("transaction").commit();
    }
    this.transitionToTransitionMap();
  }
});

module.exports = MapDestroyRoute;