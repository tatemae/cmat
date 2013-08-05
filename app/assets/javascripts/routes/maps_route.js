var MapModel = require('../models/map');

MapsRoute = Ember.Route.extend({

  afterModel: function(model, transition){
    if(transition.targetName == "maps.index"){
      transition.abort();
      this.transitionToMap();
    }
  },

  transitionToMap: function(){
    var _self = this;
    var current_user = this.controllerFor('currentUser');
    if(!Ember.isEmpty(current_user)){
      var user_id = current_user.get('id');
      if(!Ember.isEmpty(user_id)){
        return MapModel.find({user_id: user_id}).then(function(maps){
          var map = maps.objectAt(0);
          if(!Ember.isEmpty(map)){
            _self.transitionTo('map', map);
          } else {
            _self.transitionToNewMap();
          }
        });
      }
    }
    this.transitionToNewMap();
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