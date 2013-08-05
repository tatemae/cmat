var CurrentMap = require('../mixins/current_map');

MapsRoute = Ember.Route.extend(CurrentMap, {

  afterModel: function(model, transition){
    if(transition.targetName == "maps.index"){
      transition.abort();
      this.transitionToCurrentMap();
    }
  }

});

module.exports = MapsRoute;