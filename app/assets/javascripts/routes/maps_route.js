var Mapt = require('../models/map');

AssessmentsRoute = Ember.Route.extend({

  model: function(){
    Mapt.find();
  },

  afterModel: function(model, transition){
    App.Flash.pushFlash('notice', 'The flash works!.');
    if(transition.targetName == "maps.index"){
      var map = Mapt.createRecord({
        name: 'Map'
      });
      // map.save().then(function(){
      //   this.transitionTo('map', map);
      // }.bind(this));
    }
  }

});

module.exports = AssessmentsRoute;
