var MapModel = require('../models/map');

var UserMapsController = Ember.ArrayController.extend({

  needs: ['map', 'currentUser'],

  maps: function(){
    var currentUser = this.get('controllers.currentUser');
    if(!Ember.isNone(currentUser)){
      var user_id = currentUser.get('id');
      if(!Ember.isNone(user_id)){
        this.set('content', MapModel.find({user_id: user_id}));
        //return MapModel.find({user_id: user_id});
      }
    }
    //return MapModel.find({});
    this.set('content', MapModel.find({}));
  }.observes('controllers.currentUser.isSignedIn', 'controllers.map.content.persisted'),


  selectMap: function(map){
    this.transitionToRoute('map', map);
  }

});

module.exports = UserMapsController;
