Cmat.CurrentUserController = Ember.ObjectController.extend({

  loadUser: function(session){
    var userJSON = session.toJSON();
    userJSON.id = session.get('id');
    var object = this.store.load(Cmat.User, userJSON);
    var user = Cmat.User.find(userJSON.id);
    this.set('content', user);
  },

  isSignedIn: function(){
    return this.get('content.isLoaded');
  }.property('content.isLoaded')

});
