Cmat.CurrentUserController = Ember.ObjectController.extend({

  loadUserFromModel: function(user){
    this.setToken(user.get('authentication_token'));
    this.set('content', user);
  },

  loadUser: function(userJSON){
    var object = this.store.load(Cmat.User, userJSON);
    var user = Cmat.User.find(userJSON.user.id);
    this.setToken(userJSON.user.authentication_token);
    this.set('content', user);
  },

  setToken: function(token){
    if(token){
      $('meta[name="authentication-token"]').attr('content', token);
    }
  },

  isSignedIn: function(){
    var token = $('meta[name="authentication-token"]').attr('content');
    if(token){
      return true;
    }
    return false;
  }.property('content')

});
