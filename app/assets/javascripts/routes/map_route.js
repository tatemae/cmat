var MapModel = require('../models/map');
var MapRoute = Ember.Route.extend({

  model: function(params){
    var map = MapModel.find(params.map_id);
    map.on('becameError', function(){
      this.transitionTo('maps.index');
    }.bind(this));
    return map;
  }

});

module.exports = MapRoute;

