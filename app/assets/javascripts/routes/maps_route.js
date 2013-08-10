var TransitionMap = require('../mixins/transition_map');

MapsRoute = Ember.Route.extend(TransitionMap, {

  afterModel: function(model, transition){
    if(transition.targetName == "maps.index"){
      transition.abort();
      this.transitionToTransitionMap();
    }
  }

});

module.exports = MapsRoute;