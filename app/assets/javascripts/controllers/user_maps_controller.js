Cmat.UserMapsController = Ember.ArrayController.extend({

  needs: ['map', 'current_user'],

  maps: function(){
    var currentUser = this.get('controllers.current_user');
    if(!Ember.isNone(currentUser)){
      var user_id = currentUser.get('id');
      if(!Ember.isNone(user_id)){
        this.set('content', Cmat.Map.find({user_id: user_id}));
        //return Cmat.Map.find({user_id: user_id});
      }
    }
    //return Cmat.Map.find({});
    this.set('content', Cmat.Map.find({}));
  }.observes('controllers.current_user.isSignedIn', 'controllers.map.content.persisted'),


  selectMap: function(map){
    this.transitionToRoute('map', map);
  }

});