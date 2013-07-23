var MapModel = require('../models/map');

MapsRoute = Ember.Route.extend({

  afterModel: function(model, transition){
    if(transition.targetName == "maps.index"){
      var map = MapModel.createRecord({
        name: 'Map'
      });
      map.save().then(function(){
        this.transitionTo('map', map);
      }.bind(this));
    }
  }

});

module.exports = MapsRoute;
