Cmat.MapDestroyRoute = Ember.Route.extend(Cmat.TransitionMap, {
  activate: function(){
    var map = this.controllerFor('map').get('content');
    if(!Ember.isEmpty(map)){
      map.deleteRecord();
      map.get("transaction").commit();
    }
    this.transitionToTransitionMap();
  }
});
