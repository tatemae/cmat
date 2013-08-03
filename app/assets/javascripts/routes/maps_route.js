var MapModel = require('../models/map');

MapsRoute = Ember.Route.extend({

  afterModel: function(model, transition){
    if(transition.targetName == "maps.index"){
      var _self = this;
      var current_user = this.controllerFor('currentUser');
      if(current_user){
        var user_id = current_user.get('id');
        if(user_id){
          return MapModel.find({user_id: user_id}).then(function(maps){
            var map = maps.objectAt(0);
            if(map){
              _self.transitionTo('map', map);
            } else {
              _self.transitionToNewMap();
            }
          });
        }
      }
      this.transitionToNewMap();
    }
  },

  transitionToNewMap: function(){
    var map = MapModel.createRecord({
      title: 'New Map'
    });
    map.save().then(function(){
      this.transitionTo('map', map);
    }.bind(this));
  }

});

module.exports = MapsRoute;