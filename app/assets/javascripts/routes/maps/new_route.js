var MapModel = require('../../models/map');
var MapsNewRoute = Ember.Route.extend({

  model: function(){
    return MapModel.createRecord({
      title: 'New Map'
    });
  },

  afterModel: function(model, transition){
    model.save().then(function(){
      this.transitionTo('map', model);
    }.bind(this));
  }

});

module.exports = MapsNewRoute;