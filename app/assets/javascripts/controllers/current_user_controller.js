Cmat.CurrentUserController = Ember.ObjectController.extend({

  loadUserFromModel: function(user){
    this.set('content', user);
  },

  loadUser: function(userJSON){
    var object = this.store.load(Cmat.User, userJSON);
    var user = Cmat.User.find(userJSON.user.id);
    this.set('content', user);
  },

  isSignedIn: function(){
    return this.get('content.isLoaded');
  }.property('content.isLoaded')

});
