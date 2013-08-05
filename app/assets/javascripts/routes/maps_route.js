var MapModel = require('../models/map');

MapsRoute = Ember.Route.extend({

  afterModel: function(model, transition){
    if(transition.targetName == "maps.index"){
      transition.abort();
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
              console.log('no map found creating map');
              _self.transitionToNewMap();
            }
          });
        }
      }
      this.transitionToNewMap();
    }
  },

  transitionToNewMap: function(){
    var _self = this;
    var map = MapModel.createRecord({
      title: 'New Map'
    });
    map.save().then(function(){
      _self.transitionTo('map', map);
    });
  }

});

module.exports = MapsRoute;