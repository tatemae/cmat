var MapModel = require('../models/map');
var MapRoute = Ember.Route.extend({

  model: function(params){
    //return MapModel.find(params.map_id);
    // Temp HACK until we get API in place
    //App.FlashMessages.pushFlash('notice', 'The flash works!.');
    return MapModel.createRecord({
      name: 'Map'
    });
  }

});

module.exports = MapRoute;

