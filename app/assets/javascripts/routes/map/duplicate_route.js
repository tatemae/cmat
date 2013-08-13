var MapModel = require('../../models/map');
var MapDuplicateRoute = Ember.Route.extend({

  model: function(){
    var current_map = this.controllerFor('map').get('content');
    return MapModel.createRecord({
      title: current_map.get('title'),
      payload: current_map.get('payload'),
      objective_bank_id: current_map.get('objective_bank_id')
    });
  },

  afterModel: function(model, transition){
    model.save().then(function(){
      this.transitionTo('map', model);
    }.bind(this));
  }

});

module.exports = MapDuplicateRoute;
