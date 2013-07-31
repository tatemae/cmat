var MapModel = require('../models/map');
var MapRoute = Ember.Route.extend({

  model: function(params){
    return MapModel.find(params.map_id);
  }

});

module.exports = MapRoute;

