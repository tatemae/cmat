Cmat.MapRoute = Ember.Route.extend({

  model: function(params){
    var map = Cmat.Map.find(params.map_id);
    map.on('becameError', function(){
      this.transitionTo('maps.index');
    }.bind(this));
    return map;
  }

});
