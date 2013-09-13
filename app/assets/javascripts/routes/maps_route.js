Cmat.MapsRoute = Ember.Route.extend(Cmat.TransitionMap, {

  afterModel: function(model, transition){
    if(transition.targetName == "maps.index"){
      transition.abort();
      this.transitionToTransitionMap();
    }
  }

});