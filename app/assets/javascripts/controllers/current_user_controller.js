Cmat.CurrentUserController = Ember.ObjectController.extend({

  loadUserFromModel: function(user){
    this.set('content', user);
  },

  loadUser: function(userJSON){
    var object = this.store.load(Cmat.User, userJSON);
    var user = Cmat.User.find(userJSON.user.id);
    if(userJSON.user.authentication_token){
      $('meta[name="authentication-token"]').attr('content', userJSON.user.authentication_token);
    }
    this.set('content', user);
  },

  isSignedIn: function(){
    var token = $('meta[name="authentication-token"]').attr('content');
    if(token){
      return true;
    }
    return false;
  }.property('content')

});
